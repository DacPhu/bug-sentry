
function onClickViewTCDetail(testcaseID) {
  const testcase = testCases.find(tc => tc.id == testcaseID);

  $("#testcaseDetailPopup").fadeIn(200);
  $(".closeTCPopup").click(function () {
    $("#testcaseDetailPopup").fadeOut(200);
  });
  $("#tcdetail-module-name")[0].textContent = chosenModuleName;
  $("#tcdetail-tc-name")[0].textContent = testcase.title;
  $("#tcdetail-tc-description")[0].textContent =
    testcase.description ?? "No description";

  let stepsContainer = document.getElementById("tcdetail-steps");
  console.log("stepsContainer", stepsContainer);
  let stepsHtml = "";
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
  stepsContainer.innerHTML = `<div class=" d-flex justify-content-between w-40 gap-2">
                <span>Step Description </span>
                <span>Expected Result</span>
              </div>

                  ${stepsHtml}
              `;
  console.log("clickedTestcaseId", testcaseID);
}

