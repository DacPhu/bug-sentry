document
  .querySelector("#editModuleModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#nameEdit").focus();
  });

document
  .querySelector("#addModuleModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#name").focus();
  });

function showEditModuleModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#nameEdit").value = btn.dataset.name;
}

async function editModule(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("#editModuleForm"));
  let data = Object.fromEntries(formData.entries());

  try {
    let res = await fetch("/module", {
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
      "Can not update module information";
    console.log(error);
  }
}

async function deleteModule(id) {
  try {
    let res = await fetch(`/module/${id}`, {
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
    toastBody.innerHTML = "Can not delete module!";
    toastBody.classList.add("text-danger");
    toast.show();
    console.log(error);
  }
}