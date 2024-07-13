
document.addEventListener('DOMContentLoaded', function() {
const searchInput = document.getElementById('searchProject');
const projectItems = Array.from(document.querySelectorAll('.project-item'));
console.log(projectItems)
const paginationInfo = document.getElementById('pagination-info');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageDisplay = document.getElementById('current-page');

const itemsPerPage = 8;
let currentPage = 1;
let filteredProjects = projectItems;

function updateDisplay() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(startIndex, endIndex)
    projectItems.forEach((item, index) => {
    if (filteredProjects.includes(item) && index >= startIndex && index < endIndex) {
        item.style.display = '';
    } else {
        item.style.display = 'none';
    }
    });
    let entriesText;
    const finalIndex = Math.min(finalIndex, filteredProjects.length);
    if (finalIndex === 0) {
      entriesText = 'There are no entries';
    } else {
      entriesText = `Showing ${startIndex + 1} to ${finalIndex} of ${filteredProjects.length} entries`;
    }
    paginationInfo.innerText = entriesText;
    currentPageDisplay.innerText = currentPage;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = endIndex >= filteredProjects.length;
}

searchInput.addEventListener('input', function() {
    const searchQuery = searchInput.value.toLowerCase();
    filteredProjects = projectItems.filter(item => item.getAttribute('data-name').toLowerCase().includes(searchQuery));
    currentPage = 1;
    updateDisplay();
});

prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
    currentPage--;
    updateDisplay();
    }
});

nextPageBtn.addEventListener('click', function() {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (currentPage < totalPages) {
    currentPage++;
    updateDisplay();
    }
});

// Initial display
updateDisplay();
});