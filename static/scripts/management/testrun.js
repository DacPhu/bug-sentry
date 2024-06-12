document
  .querySelector("#editTestRunModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#nameEdit").focus();
  });

document
  .querySelector("#addTestRunModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#name").focus();
  });

function showEditTestRunModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
  document.querySelector("#startDateEdit").value = btn.dataset.startDate;
  document.querySelector("#endDateEdit").value = btn.dataset.endDate;
}

async function editTestRun(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#editTestRunForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/testrun", {
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