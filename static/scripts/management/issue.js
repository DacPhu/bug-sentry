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

function showEditReleaseModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
  document.querySelector("#createdByEdit").value = btn.dataset.createdBy
  document.querySelector("#statusEdit").value = btn.dataset.status;
}

async function editIssue(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#editIssueForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/issue", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
      "Can not update issue information";
    console.log(error);
  }
}

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