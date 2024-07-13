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

function formatDateToInput(dateString) {
  const momentDate = moment(
    dateString,
    "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)"
  );
  return momentDate.isValid() ? momentDate.format("YYYY-MM-DD") : "";
}

function showEditReleaseModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
  console.log("DATE", btn.dataset.startDate, btn.dataset.endDate);
  document.querySelector("#startDateEdit").value = formatDateToInput(
    btn.dataset.startDate
  );
  document.querySelector("#endDateEdit").value = formatDateToInput(
    btn.dataset.endDate
  );
}

async function editRelease(e) {
  e.preventDefault();
  const startDate = document.getElementById("editStartDate");
  const endDate = document.getElementById("editEndDate");
  const errorMessage = document.getElementById("editErrorMessage");
  const startDateValue = new Date(startDate.value);
  const endDateValue = new Date(endDate.value);

  if (startDateValue >= endDateValue) {
      e.preventDefault(); 
      errorMessage.textContent = "Ngày bắt đầu phải nhỏ hơn ngày kết thúc.";
      return
  } else {
      errorMessage.textContent = ""; 
  }
  const formData = new FormData(document.querySelector("#editReleaseForm"));
  let data = Object.fromEntries(formData.entries());
  const release_id = data.id
  console.log(release_id)
  try {
    let res = await fetch(`/api/v1/release/${release_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRF_TOKEN,
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

function confirmDelete(id) {
  $("#deleteReleaseModal").data("release_id", id);
}

async function deleteConfirmed() {
  const release_id = $("#deleteReleaseModal").data("release_id");
  try {
    let res = await fetch(`/api/v1/release/${release_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRF_TOKEN,
      },
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw Error(resText);
    }
  } catch (error) {
    // let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    // let toastBody = document.querySelector(".toast .toast-body");
    // toastBody.innerHTML = "Can not delete release!";
    // toastBody.classList.add("text-danger");
    // toast.show();
    console.log(error);
  }
}
