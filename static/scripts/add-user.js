function addUserToProject() {
  const userId = document.getElementById("userId").value;
  const projectId = document.getElementById("projectId").value;
  const roleId = document.getElementById("roleId").value;
  const status = document.getElementById("status").value;
  let active = true
  if (status === "2") {
    active = false;
  }

  fetch("/api/v1/member/add-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": CSRF_TOKEN,
    },
    body: JSON.stringify({ userId, projectId, roleId, active }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      } else {
        alert("User added to project successfully");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
