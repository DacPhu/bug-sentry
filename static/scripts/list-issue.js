document.addEventListener("DOMContentLoaded", function () {
  var dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
  const searchInput = document.getElementById("searchIssue");
  let issueItems = Array.from(document.querySelectorAll(".issue-item"));

  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");
  const sortTypeDropdown = document.getElementById('dropdownMenuType');
  const sortOrderDropdown = document.getElementById('dropdownIsAsc');
  const itemsPerPage = 8;
  let currentPage = 1;
  let filteredIssues = issueItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    issueItems.forEach((item, index) => {
      if (
        filteredIssues.includes(item) &&
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
      filteredIssues.length
    )} of ${filteredIssues.length} entries`;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredIssues.length;
  }

  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredIssues = issueItems.filter((item) =>
      item.getAttribute("data-name").toLowerCase().includes(searchQuery)
    );
    currentPage = 1;
    updateDisplay();
  });

  prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  nextPageBtn.addEventListener("click", function () {
    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  // Hàm cập nhật URL với các tham số mới và reload trang
  function updateURLParams(sortType, sortOrder) {
    var url = new URL(window.location.href);
    url.searchParams.set('sortType', sortType);
    url.searchParams.set('sortOrder', sortOrder);
    
    // Reload trang với URL mới
    window.location.href = url.toString();
  }
  dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var selectedText = item.textContent.trim();
      console.log(selectedText)
      var dropdownToggle = item.closest('.dropdown').querySelector('.dropdown-toggle');
      
      // Cập nhật nội dung của toggle dropdown thành nội dung của mục được nhấp
      dropdownToggle.textContent = selectedText;
      var selectedSortType = sortTypeDropdown.textContent.trim();
      var selectedSortOrder = sortOrderDropdown.textContent.trim();
      console.log(selectedSortType, selectedSortOrder)
    // Cập nhật URL với các tham số mới
      updateURLParams(selectedSortType, selectedSortOrder);
    });
  });
  // Initial display
  updateDisplay();
  
});
