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
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#createdByEdit").value = btn.dataset.createdBy;
  document.querySelector("#titleEdit").value = btn.dataset.title;
  // document.querySelector("#assignedToEdit").value = btn.dataset.assignedTo;
  // document.querySelector("#testCaseEdit").value = btn.dataset.testCase;
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
      console.log("HHHHH")
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

async function deleteTestRun(id) {
  try {
    let res = await fetch(`/testrun/${id}`, {
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
    toastBody.innerHTML = "Can not delete test run!";
    toastBody.classList.add("text-danger");
    toast.show();
    console.log(error);
  }
}