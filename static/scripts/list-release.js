document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchRelase");
    const releaseItems = Array.from(document.querySelectorAll(".release-item"));
  
    const paginationInfo = document.getElementById("pagination-info");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const currentPageDisplay = document.getElementById("current-page");
  
    const itemsPerPage = 3;
    let currentPage = 1;
    let filteredReleases = releaseItems;
  
    function updateDisplay() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      console.log(startIndex, endIndex);
      releaseItems.forEach((item, index) => {
        if (
          filteredReleases.includes(item) &&
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
        filteredReleases.length
      )} of ${filteredReleases.length} entries`;
      currentPageDisplay.innerText = currentPage;
      prevPageBtn.disabled = currentPage === 1;
      nextPageBtn.disabled = endIndex >= filteredReleases.length;
    }
  
    searchInput.addEventListener("input", function () {
      const searchQuery = searchInput.value.toLowerCase();
      filteredReleases = releaseItems.filter((item) =>
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
      const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        updateDisplay();
      }
    });
  
    // Initial display
    updateDisplay();
  });
  