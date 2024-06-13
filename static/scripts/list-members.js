
document.addEventListener('DOMContentLoaded', function () {
  // lấy thẻ có trong HTML
  const searchInput = document.getElementById('searchMember');
  const memberItems = Array.from(document.querySelectorAll('.member-item'));
  const paginationInfo = document.getElementById('pagination-info');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const currentPageDisplay = document.getElementById('current-page');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  const itemsPerPage = 8;
  let currentPage = 1;
  let filteredMembers = memberItems;
  var userType = "All roles";
  var userStatus = "All status";

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let id = 0;
    memberItems.forEach((item, index) => {
      if (filteredMembers.includes(item)) {
        if (id >= startIndex && id < endIndex) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
        id++; 
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

  searchInput.addEventListener('input', function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredMembers = memberItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
    if (userType != "All role")
      filteredMembers = filteredMembers.filter(item => item.getAttribute('data-role').toLowerCase() == userType.toLowerCase());
    console.log(filteredMembers)
    if (userStatus != "All status")
      filteredMembers = filteredMembers.filter(item => item.getAttribute('data-status').toLowerCase() == userStatus.toLowerCase());
    console.log(filteredMembers)
    currentPage = 1;
    updateDisplay();
  });

  prevPageBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  nextPageBtn.addEventListener('click', function () {
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });
  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var selectedText = this.textContent.trim();
      var dropdown = this.closest('.dropdown');

      var toggleButton = dropdown.querySelector('.dropdown-toggle');
      toggleButton.textContent = selectedText;
      if (toggleButton.getAttribute("id") == "dropdownUserType") {
        this.textContent = userType
        userType = selectedText
        console.log(userType, userStatus)
      }
      else {
        this.textContent = userStatus
        userStatus = selectedText
        console.log(userType, userStatus)
      }

      const searchQuery = searchInput.value.toLowerCase();
      filteredMembers = memberItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
      if (userType != "All role")
        filteredMembers = filteredMembers.filter(item => item.getAttribute('data-role').toLowerCase() == userType.toLowerCase());
      console.log(filteredMembers)
      if (userStatus != "All status")
        filteredMembers = filteredMembers.filter(item => item.getAttribute('data-status').toLowerCase() == userStatus.toLowerCase());
      console.log(filteredMembers)
      currentPage = 1;
      updateDisplay();
    });
  });
  // Initial display
  updateDisplay();
});