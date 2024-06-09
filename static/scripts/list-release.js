// const releasesContainer = document.getElementById("release-container");
// const prevPageButton = document.getElementById("prev-page");
// const nextPageButton = document.getElementById("next-page");

// let currentPage = 1;
// const pageSize = 8;
// let savedType = sessionStorage.getItem("releaseType") || "open";

// async function fetchReleases(page, size, type) {
//   const keyword = "";
//   let projectId = 1;

//   const url = window.location.href;

//   const matches = url.match(/\/project\/(\d+)\/release/);

//   if (matches && matches.length > 1) {
//     projectId = matches[1]; // Extract projectId
//   }

//   // Save type to session storage
//   sessionStorage.setItem("releaseType", type);

//   const response = await fetch(
//     `/release/api?keyword=${keyword}&type=${type}&projectId=${projectId}&page=${page}&size=${size}`
//   );
//   const data = await response.json();

//   if (response.ok) {
//     displayReleases(data.releases);
//     updatePagination(data.totalPages, data.currentPage);
//   } else {
//     console.error("Error fetching releases:", data.message);
//   }
// }

// function displayReleases(releases) {
//   releasesContainer.innerHTML = ""; // Clear previous content

//   releases.forEach((release) => {
//     // Create release element
//     const releaseElement = document.createElement("div");
//     releaseElement.classList.add("col-lg-3", "col-md-4", "col-sm-6", "mb-3");
//     releaseElement.innerHTML = `
//         <div class="bg-white">
//           <div class="card bg-info">
//             <div class="card-body">
//               <div class="d-flex justify-content-between">
//                 <div class="d-flex">
//                   <img src="/icons/project-list.svg">
//                   <div class="p-2">
//                     <h4 class="card-title">${release.name}</h4>
//                     Release key: ${release.id}
//                   </div>
//                 </div>
//               </div>
//               <div class="row">
//                 <div class="col-md-8">
//                   <p>Start date: ${release.start_date || "Not set"}</p>
//                   <p>End date: ${release.end_date || "Not set"}</p>
//                 </div>
//                 <div class="col-md-4"></div>
//               </div>
//               <hr>
//               <div class="d-flex justify-content-end">
//                 <div>
//                   <i class="bi bi-pencil-square"></i>
//                   <i class="bi bi-trash"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;

//     releasesContainer.appendChild(releaseElement); // Append release element to container
//   });
// }

// function updatePagination(totalPages, currentPage) {
//   prevPageButton.disabled = currentPage === 1;
//   nextPageButton.disabled = currentPage === totalPages;

//   prevPageButton.onclick = () => {
//     if (currentPage > 1) {
//       fetchReleases(currentPage - 1, pageSize, savedType);
//     }
//   };

//   nextPageButton.onclick = () => {
//     if (currentPage < totalPages) {
//       fetchReleases(currentPage + 1, pageSize, savedType);
//     }
//   };
// }

// // Initial fetch
// fetchReleases(currentPage, pageSize, savedType);

// async function changeType(type) {
//   savedType = type;
//   await fetchReleases(currentPage, pageSize, savedType);
// }

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#searchRelease");
  const releaseItems = Array.from(document.querySelectorAll(".release-item"));

  const paginationInfoOpen = document.getElementById("pagination-info-open");
  const paginationInfoCompleted = document.getElementById(
    "pagination-info-completed"
  );
  const paginationInfoUpcomming = document.getElementById(
    "pagination-info-upcomming"
  );
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageDisplay = document.getElementById("current-page");

  const itemsPerPage = 8;
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

    paginationInfoOpen.innerText = `Showing ${startIndex + 1} to ${Math.min(
      endIndex,
      filteredReleases.length
    )} of ${filteredReleases.length} entries`;
    paginationInfoUpcomming.innerText = `Showing ${
      startIndex + 1
    } to ${Math.min(endIndex, filteredReleases.length)} of ${
      filteredReleases.length
    } entries`;
    paginationInfoCompleted.innerText = `Showing ${
      startIndex + 1
    } to ${Math.min(endIndex, filteredReleases.length)} of ${
      filteredReleases.length
    } entries`;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredReleases.length;
  }

  //   searchInput.addEventListener("input", function () {
  //     const searchQuery = searchInput.value.toLowerCase();
  //     filteredReleases = releaseItems.filter((item) =>
  //       item.getAttribute("data-name").toLowerCase().includes(searchQuery)
  //     );
  //     currentPage = 1;
  //     updateDisplay();
  //   });

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

  updateDisplay();
});
