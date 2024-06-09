
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchMember');
    const memberItems = Array.from(document.querySelectorAll('.member-item'));
    const paginationInfo = document.getElementById('pagination-info');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageDisplay = document.getElementById('current-page');
    
    const itemsPerPage = 8;
    let currentPage = 1;
    let filteredMembers = memberItems;
    
    function updateDisplay() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
      
        memberItems.forEach((item, index) => {
          if (
            filteredMembers.includes(item) &&
            index >= startIndex &&
            index < endIndex
          ) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
        
        paginationInfo.innerText = `Showing ${startIndex + 1} to ${Math.min(
          endIndex,
          filteredMembers.length
        )} of ${filteredMembers.length} entries`;
        currentPageDisplay.innerText = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = endIndex >= filteredMembers.length;
      }
    
    searchInput.addEventListener('input', function() {
        const searchQuery = searchInput.value.toLowerCase();
        filteredMembers = memberItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
        currentPage = 1;
        updateDisplay();
    });
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
        currentPage--;
        updateDisplay();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
        if (currentPage < totalPages) {
        currentPage++;
        updateDisplay();
        }
    });
    
    // Initial display
    updateDisplay();
    });