(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";

  $(function () {
    let initialModuleId = requirementsData[0].id;
    renderer.renderModules(requirementsData, initialModuleId);
    renderer.renderRequirements(initialModuleId);
  });
});

const eventHandler = {
  onClickModule: function (moduleId) {
    console.log("clickedModuleId", moduleId);
    $("#modulesContainer .col").each(function () {
      var currentModuleId = $(this).attr("id");

      // Apply styles based on clicked module
      if (currentModuleId !== moduleId) {
        $(this).removeClass("font-weight-semibold").addClass("font-color-blur");
      } else {
        $(this).removeClass("font-color-blur").addClass("font-weight-semibold");
      }
      renderer.renderRequirements(moduleId);
    });
  },
  onClickRequirement: function (requirementId) {
    console.log("clickedRequirementId", requirementId);
  },
  assignOnClickEventToModules: function () {
    $("#modulesContainer .col").click(function () {
      console.log("clickedModuleId", $(this).attr("id"));
      var clickedModuleId = $(this).attr("id"); // Get clicked module's ID

      console.log("clickedModuleId", clickedModuleId);
      eventHandler.onClickModule(clickedModuleId);
    });
  },
  assignOnClickEventToRequirements: function () {},
};

const renderer = {
  renderModules: function (data, initialModuleId = "modules1") {
    let modulesContainer = document.getElementById("modulesContainer");
    let modules = data;
    let modulesHtml = "";
    for (let module of modules) {
      modulesHtml += `<div id="${module.id}" class="d-flex pointer-cursor align-items-center col m-4 mt-4 mb-0 ${
        initialModuleId == module.id ? "font-weight-semibold" : "font-color-blur"
      } ">
                              <img class="me-2" src="/icons/ic_round-folder.svg" alt="">
                              ${module.name}
                            </div>`;
    }
    modulesContainer.innerHTML = modulesHtml;
    eventHandler.assignOnClickEventToModules();
  },
  renderRequirements: function (modulesId) {
    let requirementsContainer = document.getElementById(
      "requirementsContainer"
    );
    console.log("requirementsData", requirementsData);
    console.log("modulesId", modulesId);
    let requirements = requirementsData.find((module) => module.id == modulesId).requirements;
    let requirementsHtml = "";
    requirements.forEach((requirement, index) => {
      requirementsHtml += `<tr id ="${requirement.id}">
            <th scope="row">${requirement.id}</th>
            <td>${requirement.name}</td>
            <td class="ps-0">
              <div
                class="d-flex pointer-cursor p-2 pt-0 pb-0 justify-content-between"
              >
                <a href="./requirement/${requirement.id}">
                    <img
                    src="/icons/mdi_eye-outline.svg"
                    alt=""
                    />
                </a>
                <img
                  src="/icons/edit.svg"
                  alt=""
                />
      
                <img
                  src="/icons/bin-red.svg"
                  alt=""
                />
              </div>
            </td>
          </tr>`;
    });
    requirementsContainer.innerHTML = requirementsHtml;

    eventHandler.assignOnClickEventToRequirements();
  },
};
