document.addEventListener("DOMContentLoaded", function () {
  var dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
  const searchInput = document.getElementById("searchActivity");
  const activityItems = Array.from(document.querySelectorAll(".activity-item"));

  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");

  const itemsPerPage = 10;
  let currentPage = 1;
  let filteredActivities = activityItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const selectedUser = document.querySelector('.dropdown-toggle[data-filter="user"]').textContent.trim().toLowerCase();
    const selectedAction = document.querySelector('.dropdown-toggle[data-filter="action"]').textContent.trim().toLowerCase();
    const selectedRole = document.querySelector('.dropdown-toggle[data-filter="role"]').textContent.trim().toLowerCase();
    const searchQuery = searchInput.value.toLowerCase();
    console.log(selectedUser, selectedAction, selectedRole, searchQuery)
    filteredActivities = activityItems.filter((item) => {
      const activityName = item.dataset.name.toLowerCase();
      const username = item.dataset.userName.toLowerCase();
      const role = item.dataset.role.toLowerCase();
      const action = item.dataset.action.toLowerCase();
      
      
      return (
        (selectedUser === "all users" || username === selectedUser) &&
        (selectedAction === "all actions" || action === selectedAction) &&
        (selectedRole === "all roles" || role === selectedRole) &&
        activityName.includes(searchQuery)
      );
    });
    let id = 0;
    activityItems.forEach((item, index) => {
      if (filteredActivities.includes(item)) {
        if (id >= startIndex && id < endIndex) {
          item.classList.remove('d-none'); // Xóa lớp để hiển thị
        } else {
          item.classList.add('d-none'); // Xóa lớp để hiển thị
        }
        id++; 
      } else {
        item.classList.add('d-none'); // Xóa lớp để hiển thị
      }
    });

    paginationInfo.innerText = `Showing ${startIndex + 1} to ${Math.min(
      endIndex,
      filteredActivities.length
    )} of ${filteredActivities.length} entries`;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredActivities.length;
  }

  function handleDropdownChange(event) {
    var selectedText = event.target.textContent.trim();
    var dropdownToggle = event.target.closest('.dropdown').querySelector('.dropdown-toggle');
    dropdownToggle.textContent = selectedText;
    currentPage = 1;
    updateDisplay();
  }

  searchInput.addEventListener("input", function () {
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
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  dropdownItems.forEach(function (item) {
    item.addEventListener('click', handleDropdownChange);
  });

  updateDisplay();
});
