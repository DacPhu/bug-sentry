function toggleSection(sectionId) {
  var ownedSection = document.getElementById("section-owned-board");
  var joinedSection = document.getElementById("section-joined-board");

  if (sectionId === "section-owned-board") {
    ownedSection.style.display = "block";
    joinedSection.style.display = "none";
  } else if (sectionId === "section-joined-board") {
    ownedSection.style.display = "none";
    joinedSection.style.display = "block";
  }
}
