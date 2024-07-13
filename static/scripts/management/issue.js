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
$('#editStatus').on('click', function () {
  $('#viewIssueStatus').prop('disabled', false);
  $('#viewIssueStatus').prop('required', true);
  $('.modal-footer').removeClass('d-none');
});
$('#editPriority').on('click', function () {
  $('#viewIssuePriority').prop('disabled', false);
  $('#viewIssuePriority').prop('required', true);
  $('.modal-footer').removeClass('d-none');
});
$('#editTitle').on('click', function () {
  $('#viewIssueTitle').prop('disabled', false);
  $('#viewIssueTitle').prop('required', true);
  $('.modal-footer').removeClass('d-none');
});
$('#viewIssueModal').on('hide.bs.modal', function () {

  $('#viewIssueTitle').prop('disabled', true);
  $('#viewIssueTitle').prop('required', false);
  
  $('#viewIssueStatus').prop('disabled', true);
  $('#viewIssueStatus').prop('required', false);
  
  $('#viewIssuePriority').prop('disabled', true);
  $('#viewIssuePriority').prop('required', false);
  
  $('#viewIssueDescription').prop('disabled', true);
  $('#viewIssueDescription').prop('required', false);

  
  $('.modal-footer').addClass('d-none');
  
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
function confirmDelete(id) {
  console.log(id)
  $("#deleteIssueModal").data("issue_id", id);
}
async function deleteConfirmed(id) {
 
  const issue_id = $("#deleteIssueModal").data("issue_id");
  console.log(issue_id)
  try {
    let res = await fetch(`/api/v1/issue/${issue_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRF_TOKEN,
      },
    });
    if (res.status == 204) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    console.log(error);
  }
}
