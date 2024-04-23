function showDialog() {
  $("#moduleNameModal").modal("show");
}

function createModule() {
  var moduleName = document.getElementById("moduleNameInput").value;
  if (moduleName.trim() === "") {
    alert("Please enter a module name.");
    return;
  }

  var moduleTemplate = document.createElement("div");
  moduleTemplate.className = "col-lg-3 col-md-4 col-sm-6 mb-3";
  moduleTemplate.innerHTML = `
      <div class="bg-white">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <i class="fa fa-list-alt fa-4x" aria-hidden="true"></i>
              <div class="p-2">
                <h4 class="card-title">${moduleName}</h4>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-end">
              <div>
                <i class="bi bi-pencil-square"></i>
                <i class="bi bi-trash" onclick="confirmDelete(this)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  document.getElementById("moduleContainer").appendChild(moduleTemplate);
  $("#moduleNameModal").modal("hide");
  document.getElementById("moduleNameInput").value = "";
}
function confirmDelete(icon) {
  var module = icon.closest(".col-lg-3");
  $("#deleteConfirmationModal").modal("show");
  $("#deleteConfirmationModal").data("module", module);
}

function deleteConfirmed() {
  var module = $("#deleteConfirmationModal").data("module");
  module.parentNode.removeChild(module);
  $("#deleteConfirmationModal").modal("hide");
}
