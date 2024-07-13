
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
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
        id++;
      } else {
        item.classList.add('d-none');
      }
    });
    let entriesText;
    const finalIndex = Math.min(endIndex, filteredMembers.length);
    if (finalIndex === 0) {
      entriesText = 'There are no entries';
    } else {
      entriesText = `Showing ${startIndex + 1} to ${finalIndex} of ${filteredMembers.length} entries`;
    }
    paginationInfo.innerText = entriesText;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredMembers.length;
  }

  searchInput.addEventListener('input', function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredMembers = memberItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
    if (userType != "All roles")
      filteredMembers = filteredMembers.filter(item => item.getAttribute('data-role').toLowerCase() == userType.toLowerCase());
    if (userStatus != "All status")
      filteredMembers = filteredMembers.filter(item => item.getAttribute('data-status').toLowerCase() == userStatus.toLowerCase());
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
      }
      else {
        this.textContent = userStatus
        userStatus = selectedText
      }

      const searchQuery = searchInput.value.toLowerCase();
      filteredMembers = memberItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
      if (userType != "All roles")
        filteredMembers = filteredMembers.filter(item => item.getAttribute('data-role').toLowerCase() == userType.toLowerCase());
      if (userStatus != "All status")
        filteredMembers = filteredMembers.filter(item => item.getAttribute('data-status').toLowerCase() == userStatus.toLowerCase());
      currentPage = 1;
      updateDisplay();
    });
  });
  // Initial display
  updateDisplay();
});
