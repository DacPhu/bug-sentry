const navLinks = document.querySelectorAll(".nav-link");

function handleNavItemClick(event) {

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  this.classList.add("active");

  const chosenItem = this.getAttribute("href");

  localStorage.setItem("chosenItem", chosenItem);
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavItemClick);
});

document.addEventListener("DOMContentLoaded", function () {
  const chosenItem = localStorage.getItem("chosenItem");
  if (chosenItem) {
    const activeLink = document.querySelector(
      `#navbar-in-project .nav-item .nav-link[href="${chosenItem}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
});


