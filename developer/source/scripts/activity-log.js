// Function để hiển thị form add issue
function showAddIssue() {
  document.querySelector(".overlay").style.display = "block"; // bật overlay
  document.querySelector(".add-issue-table").style.display = "block"; // bật add issue table
}

// Function để save issue
function saveIssue() {
  document.querySelector(".overlay").style.display = "none"; // tắt overlay
  document.querySelector(".add-issue-table").style.display = "none"; // tắt add issue table
}

// Function để cancel add issue
function cancelAddIssue() {
  document.querySelector(".overlay").style.display = "none"; // tắt overlay
  document.querySelector(".add-issue-table").style.display = "none"; // tắt add issue table
}
