document
  .querySelector("#editReleaseModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#nameEdit").focus();
  });

document
  .querySelector("#addReleaseModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#name").focus();
  });

function showEditReleaseModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
  document.querySelector("#startDateEdit").value = btn.dataset.startDate;
  document.querySelector("#endDateEdit").value = btn.dataset.endDate;
}

async function editRelease(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#editReleaseForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/release", {
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
      "Can not update release information";
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    let res = await fetch(`/release/${id}`, {
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
    toastBody.innerHTML = "Can not delete release!";
    toastBody.classList.add("text-danger");
    toast.show();
    console.log(error);
  }
}

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    console.log(id);
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("id");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5diaLog.confirm(
      "Do you really want to delete this release?",
      options
    );
  });
});
