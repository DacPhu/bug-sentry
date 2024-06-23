document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchTestRun");
  const testRunItems = Array.from(document.querySelectorAll(".test-run-item"));

  const paginationInfo = document.getElementById("pagination-info");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");

  const itemsPerPage = 5;

  let releaseId = "All"
  let currentPage = 1;
  let filteredTestRuns = testRunItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex);
    console.log(filteredTestRuns)
    let id = 0;
    testRunItems.forEach((item) => {
      if (filteredTestRuns.includes(item)) {
        if (id >= startIndex && id < endIndex) {
          item.classList.remove('d-none'); // Xóa lớp để hiển thị
        } else {
          item.classList.add('d-none'); // Xóa lớp để hiển thị
        }
        id++;
      } else {
        item.classList.add('d-none'); // Thêm lớp để ẩn
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
      item.dataset.name.toLowerCase().includes(searchQuery)
    );
    const release = document.getElementById('dropdownMenu2').textContent;
    if (releaseId != "All")
      filteredTestRuns = filteredTestRuns.filter((item) =>
        item.dataset.release == releaseId
      )
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
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      let toggleButton = document.getElementById('dropdownMenu2');
      toggleButton.textContent = this.textContent;
      releaseId = this.dataset.id
      const searchQuery = searchInput.value.toLowerCase();
      filteredTestRuns = testRunItems.filter((item) =>
        item.dataset.name.toLowerCase().includes(searchQuery)
      );
      const release = document.getElementById('dropdownMenu2').textContent;
      if (releaseId != "All")
        filteredTestRuns = filteredTestRuns.filter((item) =>
          item.dataset.release == releaseId
        )
      currentPage = 1;
      updateDisplay();
    });
  });

  // Initial display
  updateDisplay();
});
