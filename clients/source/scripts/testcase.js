

(function (fn) {
    "use strict";
    fn(window.jQuery, window, document);
})(function ($, window, document) {
    "use strict";

    $(function () {

        let initialModuleId = 'modules1';
        renderer.renderModules(dataFaker, initialModuleId);
        renderer.renderTestcases(initialModuleId);



    });
});





const dataFaker = {
    modules: {
        "modules1": {
            id: "modules1",
            name: "Module 1",
            testcases: [
                {
                    id: "tc4",
                    title: "Testcase Number 4",
                    steps: 4,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 4 step 1",
                            expectedResult: "Expected of tc 4 step 1"
                        },
                        {
                            description: "Here is the description of tc 4 step 2",
                            expectedResult: "Expected of tc 4 step 2"
                        },
                        {
                            description: "Here is the description of tc 4 step 3",
                            expectedResult: "Expected of tc 4 step 3"
                        },


                    ]
                },
                {
                    id: "tc5",
                    title: "Testcase Number 5",
                    steps: 5,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 5 step 1",
                            expectedResult: "Expected of tc 5 step 1"
                        },
                        {
                            description: "Here is the description of tc 5 step 2",
                            expectedResult: "Expected of tc 5 step 2"
                        },
                        {
                            description: "Here is the description of tc 5 step 3",
                            expectedResult: "Expected of tc 5 step 3"
                        },


                    ]
                },
                {
                    id: "tc6",
                    title: "Testcase Number 6",
                    steps: 6,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 6 step 1",
                            expectedResult: "Expected of tc 6 step 1"
                        },
                        {
                            description: "Here is the description of tc 6 step 2",
                            expectedResult: "Expected of tc 6 step 2"
                        },
                        {
                            description: "Here is the description of tc 6 step 3",
                            expectedResult: "Expected of tc 6 step 3"
                        },


                    ]
                }

            ]
        },
        "modules2": {
            id: "modules2",
            name: "Module 2",
            testcases: [
                {
                    id: "tc7",
                    title: "Testcase Number 7",
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 7 step 1",
                            expectedResult: "Expected of tc 7 step 1"
                        },
                        {
                            description: "Here is the description of tc 7 step 2",
                            expectedResult: "Expected of tc 7 step 2"
                        },
                        {
                            description: "Here is the description of tc 7 step 3",
                            expectedResult: "Expected of tc 7 step 3"
                        },


                    ]
                },
                {
                    id: "tc8",
                    title: "Testcase Number 8",
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 8 step 1",
                            expectedResult: "Expected of tc 8 step 1"
                        },
                        {
                            description: "Here is the description of tc 6 step 2",
                            expectedResult: "Expected of tc 8 step 2"
                        },
                        {
                            description: "Here is the description of tc 6 step 3",
                            expectedResult: "Expected of tc 8 step 3"
                        },
                    ]
                },
                {
                    id: "tc9",
                    title: "Testcase Number 9",
                    steps: 9,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description of tc 9 step 1",
                            expectedResult: "Expected of tc 9 step 1"
                        },
                        {
                            description: "Here is the description of tc 9 step 2",
                            expectedResult: "Expected of tc 9 step 2"
                        },
                        {
                            description: "Here is the description of tc 9 step 3",
                            expectedResult: "Expected of tc 9 step 3"
                        },


                    ]
                }
            ]
        },
        "modules3": {
            id: "modules3",
            name: "Module 3",
            testcases: [
                {
                    id: "tc10",
                    title: "Testcase Number 10",
                    steps: 10,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the description",
                            expectedResult: "Expected 1"
                        },
                        {
                            description: "Here is the description",
                            expectedResult: "Expected 2"
                        },
                        {
                            description: "Here is the description",
                            expectedResult: "Expected 3"
                        },


                    ]
                },
                
                {
                    id: "tc12",
                    title: "Testcase Number 12",
                    steps: 12,
                    createdBy: "Lokiss do",
                    createdAt: " 2021-09-09",
                    steps: [
                        {
                            description: "Here is the descrisdsadption",
                            expectedResult: "Expectedada 1"
                        },
                        {
                            description: "Here is the sadsaddescsadsadription",
                            expectedResult: "Expected 2"
                        },
                        {
                            description: "Here is the description",
                            expectedResult: "Expected 3dsadsad"
                        },


                    ]
                }
            ]
        }


    }
}

const eventHandler = {
    onClickModule: function (moduleId) {
        console.log('clickedModuleId', moduleId);
        $('#modulesContainer .col').each(function () {
            var currentModuleId = $(this).attr('id');

            // Apply styles based on clicked module
            if (currentModuleId !== moduleId) {
                $(this).removeClass('font-weight-semibold').addClass('font-color-blur');
            } else {
                $(this).removeClass('font-color-blur').addClass('font-weight-semibold');
            }
            renderer.renderTestcases(moduleId);
        });
    },
    onClickTestcase: function (testcaseId) {
        console.log('clickedTestcaseId', testcaseId);
    },
    onClickViewTCDetail: function (testcaseId) {
        console.log($("#testcaseDetailPopup"))

        $("#testcaseDetailPopup").fadeIn(200);
        $(".closeTCPopup").click(function () {
            $("#testcaseDetailPopup").fadeOut(200);
        });

        // find in dataFaker testcases having id = testcaseId
        let testcase = null;
        let moduleName = '';
        for (let moduleId in dataFaker.modules) {
            let testcases = dataFaker.modules[moduleId].testcases;
            testcase = testcases.find(testcase => testcase.id == testcaseId);
            if (testcase) {
                moduleName = dataFaker.modules[moduleId].name;
                break;
            }
        }
        $("#tcdetail-module-name")[0].textContent = moduleName;
        $("#tcdetail-tc-name")[0].textContent = testcase.title;
        $("#tcdetail-tc-description")[0].textContent = testcase.description??'No description';

        let stepsContainer = document.getElementById("tcdetail-steps")
        console.log('stepsContainer', stepsContainer)
        let stepsHtml = '';
        testcase.steps.forEach((step, index) => {
            stepsHtml += `
            <div class="test-step d-flex justify-content-around gap-3 mb-3">
            <div class="input-group w-50 border semi-border-grey semi-rounded p-2">

            ${step.description}
          </div>
          <div class="input-group w-50 border semi-border-grey semi-rounded p-2">

          ${step.expectedResult}
          </div>
          </div>`;
        });
        stepsContainer.innerHTML =
            `<div class=" d-flex justify-content-between w-40 gap-2">
                  <span>Step Description </span>
                  <span>Expected Result</span>
                </div>

                    ${stepsHtml}
                `;
        console.log('clickedTestcaseId', testcaseId);
    },
    assignOnClickEventToModules: function () {

        $('#modulesContainer .col').click(function () {
            console.log('clickedModuleId', $(this).attr('id'));
            var clickedModuleId = $(this).attr('id'); // Get clicked module's ID

            console.log('clickedModuleId', clickedModuleId);
            eventHandler.onClickModule(clickedModuleId);
        });
    },
    assignOnClickEventToTestcases: function () {

        $(".detailTC").click(function () {
            var clickedTestcaseId = $(this).attr('id'); // Get clicked module's ID

            console.log('clickedTestcaseId', clickedTestcaseId);
            eventHandler.onClickViewTCDetail(clickedTestcaseId);
        });

    }
}

const renderer = {
    renderModules: function (data, initialModuleId = 'modules1') {
        let modulesContainer = document.getElementById('modulesContainer');
        let modules = data.modules;
        let modulesHtml = '';
        for (let moduleId in modules) {
            let module = modules[moduleId];
            modulesHtml += `<div id="${moduleId}" class="d-flex pointer-cursor align-items-center col m-4 mt-4 mb-0 ${initialModuleId == moduleId ? 'font-weight-semibold' : 'font-color-blur'} ">
                              <img class="me-2" src="../../../public/icons/ic_round-folder.svg" alt="">
                              ${module.name}
                            </div>`;
        }
        modulesContainer.innerHTML = modulesHtml;
        eventHandler.assignOnClickEventToModules();
    },
    renderTestcases: function (modulesId) {
        let testcasesContainer = document.getElementById('testcasesContainer');
        let testcases = dataFaker.modules[modulesId].testcases;
        let testcasesHtml = '';
        testcases.forEach((testcase, index) => {
            testcasesHtml += `<tr>
            <th scope="row">${testcase.id}</th>
            <td>${testcase.title}</td>
            <td>${testcase.steps.length}</td>

            <td>${testcase.createdBy}</td>

            <td
              style="max-width: 100px"
              class="eclipsis-overflow"
            >
            ${testcase.createdAt}
            </td>

            <td class="ps-0">
              <div
                class="d-flex pointer-cursor p-2 pt-0 pb-0 justify-content-end"
              >
              <img class="detailTC me-2" id="${testcase.id}" 
                                  src="../../../public/icons/mdi_eye-outline.svg"
                                  alt=""
                                />
                <img
                  src="../../../public/icons/bin-black.svg"
                  alt=""
                />
              </div>
            </td>
          </tr>`;
        });
        testcasesContainer.innerHTML = testcasesHtml;

        eventHandler.assignOnClickEventToTestcases();
    }
}