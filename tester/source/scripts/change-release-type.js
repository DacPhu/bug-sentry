function showSection(sectionId) {
  var sections = document.querySelectorAll("section.container");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  document.getElementById(sectionId).style.display = "block";
}
