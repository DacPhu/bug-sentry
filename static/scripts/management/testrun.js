document
  .querySelector("#editTestRunModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#titleEdit").focus();
  });

document
  .querySelector("#addTestRunModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#title").focus();
  });

function showEditTestRunModal(btn) {
  console.log(btn.dataset.assignedTo)
  document.querySelector("#createdByEdit").value = btn.dataset.createdBy;
  document.querySelector("#titleEdit").value = btn.dataset.title;
  document.querySelector("#assignedToEdit").textContent = btn.dataset.assignedTo ;
  document.querySelector("#testCaseEdit").textContent = btn.dataset.testCase;
  document.querySelector("#releaseEdit").textContent = btn.dataset.release;
  // document.querySelector("#assignedToEdit").value = btn.dataset.assignedTo;
  // document.querySelector("#testCaseEdit").value = btn.dataset.testCase;
}
function showRunTestRunModal(btn) {
  document.querySelector("#createdByRun").value = btn.dataset.createdBy;
  document.querySelector("#titleRun").value = btn.dataset.title;
  document.querySelector("#assignedToRun").textContent = btn.dataset.assignedTo ;
  document.querySelector("#testCaseRun").textContent = btn.dataset.testCase;
  document.querySelector("#releaseRun").textContentgit = btn.dataset.release;
}

async function editTestRun(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#editTestRunForm"));
  let data = Object.fromEntries(formData.entries());
  const csrfToken = data._csrf
  const id = data.id;
  delete data._csrf, data.id;
  console.log(data, csrfToken, id)
  try {
    let res = await fetch(`/api/v1/testrun/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(data),
    });
    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText =
      "Can not update test run information";
    console.log(error);
  }
}
function confirmDelete(id) {
  // $("#deleteConfirmationModal").modal("show");
  $("#deleteTestRunModal").data("testrun_id", id);
}
async function deleteConfirmed() {
  const testrun_id = $("#deleteTestRunModal").data("testrun_id");
  console.log(testrun_id, CSRF_TOKEN)
  try {
    let res = await fetch(`/api/v1/testrun/${testrun_id}`, {
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