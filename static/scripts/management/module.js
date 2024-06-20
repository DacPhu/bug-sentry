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
  const id = data.id;
  delete data.id;
  console.log(data, CSRF_TOKEN, id)
  try {
    let res = await fetch(`/api/v1/module/${id}`, {
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
      "Can not update module information";
    console.log(error);
  }
}
function confirmDelete(id) {
  $("#deleteModuleModal").data("module_id", id);
}

async function deleteConfirmed() {
  const module_id = $("#deleteModuleModal").data("module_id");
  console.log(module_id, CSRF_TOKEN)
  try {
    let res = await fetch(`/api/v1/module/${module_id}`, {
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