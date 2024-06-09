document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchActivity");
  const activityItems = Array.from(document.querySelectorAll(".activity-item"));

  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");

  const itemsPerPage = 3;
  let currentPage = 1;
  let filteredActivities = activityItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex);
    activityItems.forEach((item, index) => {
      if (
        filteredActivities.includes(item) &&
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
      filteredActivities.length
    )} of ${filteredActivities.length} entries`;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredActivities.length;
  }

  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredActivities = activityItems.filter((item) =>
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
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  updateDisplay();
});
