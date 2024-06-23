document
  .querySelector("#editIssueModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#nameEdit").focus();
  });

document
  .querySelector("#addIssueModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#issueTitle").focus();
  });

function showEditIssueModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
  document.querySelector("#createdByEdit").value = btn.dataset.createdBy
  document.querySelector("#statusEdit").value = btn.dataset.status;
}
function showViewIssueModal(btn) {
  console.log("HHHHH")
  document.querySelector("#viewIssueId").value = btn.dataset.id;
  document.querySelector("#viewIssueTitle").value = btn.dataset.name;
  document.querySelector("#viewIssueStatus").value = btn.dataset.status;
  document.querySelector("#viewIssuePriority").value = btn.dataset.priority;
  document.querySelector("#viewIssueDescription").value = btn.dataset.description;

}
$('#editDescription').on('click', function() {
  $('#viewIssueDescription').prop('disabled', false);
  $('#viewIssueDescription').prop('required', true);
  $('.modal-footer').removeClass('d-none');
});
$('#editIssueForm').on('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(document.querySelector("#editIssueForm"));
  let data = Object.fromEntries(formData.entries());
  const csrfToken = data._csrf
  const id = data.id;
  delete data._csrf, data.id;
  console.log(data, csrfToken, id)
  try {
    await fetch(`/api/v1/issue/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(data),
    });
    location.reload()
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText =
      "Can not update Issue information";
    console.log(error);
  }


});


async function deleteUser(id) {
  try {
    let res = await fetch(`/issue/${id}`, {
      method: "DELETE",
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw Error(resText);
    }
  } catch (error) {
    let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    let toastBody = document.querySelector(".toast .toast-body");
    toastBody.innerHTML = "Can not delete issue!";
    toastBody.classList.add("text-danger");
    toast.show();
    console.log(error);
  }
}