document.addEventListener("DOMContentLoaded", function () {
  const sectionOpen = document.getElementById("open-releases");
  const sectionUpcoming = document.getElementById("upcoming-releases");
  const sectionCompleted = document.getElementById("completed-releases");

  const searchOpenInput = document.getElementById("searchOpenRelease");
  const searchUpcomingInput = document.getElementById("searchUpcomingRelease");
  const searchCompletedInput = document.getElementById(
    "searchCompletedRelease"
  );

  const releaseOpenItems = Array.from(
    document.querySelectorAll(".release-open-item")
  );
  const releaseCompletedItems = Array.from(
    document.querySelectorAll(".release-completed-item")
  );
  const releaseUpcomingItems = Array.from(
    document.querySelectorAll(".release-upcoming-item")
  );

  const paginationInfoOpen = document.getElementById("pagination-info-open");
  const paginationInfoCompleted = document.getElementById(
    "pagination-info-completed"
  );
  const paginationInfoUpcoming = document.getElementById(
    "pagination-info-upcoming"
  );

  const url = new URL(window.location.href);
  const type = url.searchParams.get("type");

  if (type === "completed") {
    sectionCompleted.style.display = "block";
    sectionOpen.style.display = "none";
    sectionUpcoming.style.display = "none";
  } else if (type === "upcoming") {
    sectionUpcoming.style.display = "block";
    sectionCompleted.style.display = "none";
    sectionOpen.style.display = "none";
  } else {
    sectionOpen.style.display = "block";
    sectionCompleted.style.display = "none";
    sectionUpcoming.style.display = "none";
  }

  const prevPageBtnOpen = document.getElementById("prev-page-open");
  const nextPageBtnOpen = document.getElementById("next-page-open");
  const prevPageBtnCompleted = document.getElementById("prev-page-completed");
  const nextPageBtnCompleted = document.getElementById("next-page-completed");
  const prevPageBtnUpcoming = document.getElementById("prev-page-upcoming");
  const nextPageBtnUpcoming = document.getElementById("next-page-upcoming");

  const currentPageDisplayOpen = document.getElementById("current-page-open");
  const currentPageDisplayCompleted = document.getElementById(
    "current-page-completed"
  );
  const currentPageDisplayUpcoming = document.getElementById(
    "current-page-upcoming"
  );

  const itemsPerPage = 8;
  let currentPage = 1;
  let filteredOpenReleases = releaseOpenItems;
  let filteredCompletedReleases = releaseCompletedItems;
  let filteredUpcomingReleases = releaseUpcomingItems;

  function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex);
    let idOpen = 0
    releaseOpenItems.forEach((item, index) => {
      if (filteredOpenReleases.includes(item)) {
        if (idOpen >= startIndex && idOpen < endIndex) {
          item.classList.remove('d-none'); // Xóa lớp để hiển thị
        } else {
          item.classList.add('d-none'); // Xóa lớp để hiển thị
        }
        idOpen++; 
      } else {
        item.classList.add('d-none'); // Xóa lớp để hiển thị
      }
    });
    let idCompleted = 0;
    releaseCompletedItems.forEach((item, index) => {
      if (filteredCompletedReleases.includes(item)) {
        if (idCompleted >= startIndex && idCompleted < endIndex) {
          item.classList.remove('d-none'); // Xóa lớp để hiển thị
        } else {
          item.classList.add('d-none'); // Xóa lớp để hiển thị
        }
        idCompleted++; 
      } else {
        item.classList.add('d-none'); // Xóa lớp để hiển thị
      }
    });
    let idUpcoming = 0;
    releaseUpcomingItems.forEach((item, index) => {
      if (filteredUpcomingReleases.includes(item)) {
        if (idUpcoming >= startIndex && idUpcoming < endIndex) {
          item.classList.remove('d-none'); // Xóa lớp để hiển thị
        } else {
          item.classList.add('d-none'); // Xóa lớp để hiển thị
        }
        idUpcoming++; 
      } else {
        item.classList.add('d-none'); // Xóa lớp để hiển thị
      }
    });
    paginationInfoOpen.innerText = `Showing ${startIndex + 1} to ${Math.min(
      endIndex,
      filteredOpenReleases.length
    )} of ${filteredOpenReleases.length} entries`;
    paginationInfoCompleted.innerText = `Showing ${
      startIndex + 1
    } to ${Math.min(endIndex, filteredCompletedReleases.length)} of ${
      filteredCompletedReleases.length
    } entries`;
    paginationInfoUpcoming.innerText = `Showing ${startIndex + 1} to ${Math.min(
      endIndex,
      filteredUpcomingReleases.length
    )} of ${filteredUpcomingReleases.length} entries`;

    currentPageDisplayOpen.innerText = currentPage;
    prevPageBtnOpen.disabled = currentPage === 1;
    nextPageBtnOpen.disabled = endIndex >= filteredOpenReleases.length;

    currentPageDisplayCompleted.innerText = currentPage;
    prevPageBtnCompleted.disabled = currentPage === 1;
    nextPageBtnCompleted.disabled =
      endIndex >= filteredCompletedReleases.length;

    currentPageDisplayUpcoming.innerText = currentPage;
    prevPageBtnUpcoming.disabled = currentPage === 1;
    nextPageBtnUpcoming.disabled = endIndex >= filteredUpcomingReleases.length;
  }

  searchOpenInput.addEventListener("input", function () {
    const value = searchOpenInput.value;
    const searchQuery = value.toLowerCase();
    filteredOpenReleases = releaseOpenItems.filter((item) =>
      item.getAttribute("data-name").toLowerCase().includes(searchQuery)
    );
    currentPage = 1;
    updateDisplay();
  });

  searchUpcomingInput.addEventListener("input", function () {
    const value = searchUpcomingInput.value;
    const searchQuery = value.toLowerCase();
    filteredUpcomingReleases = releaseUpcomingItems.filter((item) =>
      item.getAttribute("data-name").toLowerCase().includes(searchQuery)
    );
    currentPage = 1;
    updateDisplay();
  });

  searchCompletedInput.addEventListener("input", function () {
    const value = searchCompletedInput.value;

     
    const searchQuery = value.toLowerCase();
    filteredCompletedReleases = releaseCompletedItems.filter((item) =>
      item.getAttribute("data-name").toLowerCase().includes(searchQuery)
    );
    currentPage = 1;
    
    updateDisplay();
  });

  prevPageBtnOpen.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  nextPageBtnOpen.addEventListener("click", function () {
    const totalPages = Math.ceil(filteredOpenReleases.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  prevPageBtnCompleted.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  nextPageBtnCompleted.addEventListener("click", function () {
    const totalPages = Math.ceil(
      filteredCompletedReleases.length / itemsPerPage
    );
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  prevPageBtnUpcoming.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  nextPageBtnUpcoming.addEventListener("click", function () {
    const totalPages = Math.ceil(
      filteredUpcomingReleases.length / itemsPerPage
    );
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  updateDisplay();
});
