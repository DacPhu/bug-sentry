document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchTestRun");
  const testRunItems = Array.from(document.querySelectorAll(".test-run-item"));

  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");

  const itemsPerPage = 3;
  let currentPage = 1;
  let filteredTestRuns = testRunItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex);
    testRunItems.forEach((item, index) => {
      if (
        filteredTestRuns.includes(item) &&
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
      filteredTestRuns.length
    )} of ${filteredTestRuns.length} entries`;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredTestRuns.length;
  }

  searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value.toLowerCase();
    filteredTestRuns = testRunItems.filter((item) =>
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
    const totalPages = Math.ceil(filteredTestRuns.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  // Initial display
  updateDisplay();
});
