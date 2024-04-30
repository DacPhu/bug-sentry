(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";

  $(function () {
    let initialModuleId = "modules1";
    renderer.renderModules(dataFaker, initialModuleId);
    renderer.renderRequirements(initialModuleId);
  });
});

const dataFaker = {
  modules: {
    modules1: {
      id: "modules1",
      name: "Module 1",
      requirements: [
        {
          id: "req1",
          name: "Requirement Number 1",
        },
        {
          id: "req2",
          name: "Requirement Number 2",
        },
        {
          id: "req3",
          name: "Requirement Number 3",
        },
      ],
    },
    modules2: {
      id: "modules2",
      name: "Module 2",
      requirements: [
        {
          id: "req4",
          name: "Requirement Number 4",
        },
        {
          id: "req5",
          name: "Requirement Number 5",
        },
        {
          id: "req6",
          name: "Requirement Number 6",
        },
      ],
    },
    modules3: {
      id: "modules3",
      name: "Module 3",
      requirements: [
        {
          id: "req7",
          name: "Requirement Number 7",
        },
        {
          id: "req8",
          name: "Requirement Number 8",
        },
        {
          id: "req9",
          name: "Requirement Number 9",
        },
      ],
    },
  },
};

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
    let modules = data.modules;
    let modulesHtml = "";
    for (let moduleId in modules) {
      let module = modules[moduleId];
      modulesHtml += `<div id="${moduleId}" class="d-flex pointer-cursor align-items-center col m-4 mt-4 mb-0 ${
        initialModuleId == moduleId ? "font-weight-semibold" : "font-color-blur"
      } ">
                              <img class="me-2" src="../../../public/icons/ic_round-folder.svg" alt="">
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
    let requirements = dataFaker.modules[modulesId].requirements;
    let requirementsHtml = "";
    requirements.forEach((requirement, index) => {
      requirementsHtml += `<tr id ="${requirement.id}">
            <th scope="row">${requirement.id}</th>
            <td>${requirement.name}</td>
            <td class="ps-0">
              <div
                class="d-flex pointer-cursor p-2 pt-0 pb-0 justify-content-between"
              >
                <a href="./detail-requirement.html">
                    <img
                    src="../../../public/icons/mdi_eye-outline.svg"
                    alt=""
                    />
                </a>
                <img
                  src="../../../public/icons/edit.svg"
                  alt=""
                />
      
                <img
                  src="../../../public/icons/bin-red.svg"
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
