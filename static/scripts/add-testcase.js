
(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";

  $(function () {
    // Click event handler for the "Add" button
    function attachEventHandlers() {
      $(".add-teststep-btn")
        .off("click")
        .click(function () {
          var stepCount = 2;
          // Clone the existing step container
          console.log($(this).parent());
          var newStep = $(this).parent().parent().clone();

          // Update step number within the cloned element

          // Append the cloned step container after the current one
          $(this).parent().parent().after(newStep);

          // Clear the values of the newly added textareas
          newStep.find("textarea").val("");
          attachEventHandlers();
        });

      // Click event handler for the "Delete" button
      $(".delete-teststep-btn")
        .off("click")
        .click(function () {
          if ($(".delete-teststep-btn").length > 1) {
            $(this).parent().parent().remove();
          } else {
            alert("You cannot delete the only step!"); // Inform the user
          }
        });
    }
    attachEventHandlers();

    $("#modulesContainer .col").click(function () {
      var clickedModuleId = $(this).attr("id"); // Get clicked module's ID

      // Loop through all other modules within the container
      $("#modulesContainer .col").each(function () {
        var currentModuleId = $(this).attr("id");

        // Apply styles based on clicked module
        if (currentModuleId !== clickedModuleId) {
          $(this)
            .removeClass("font-weight-semibold")
            .addClass("font-color-blur");
        } else {
          $(this)
            .removeClass("font-color-blur")
            .addClass("font-weight-semibold");
        }
      });
    });

    $(".closePopup").click(function () {
      $("#testCasePopup").hide();
    });

    $("#saveTestCase").click(function () {
      var module = $("select[name='module']").val();
      var testCaseName = $("input[name='testcase-name']").val();
      var description = $("textarea[name='testcase-description']").val();

      if (!module || !testCaseName) {
        $.notify("Please fill all the fields", "warn");
        return;
      }
      var steps = [];
      var createdBy = account.username;
      var createdAt = new Date().toISOString();

      $(".test-step").each(function () {
        console.log($(this));
        let des = $(this).find("textarea[name='step-description']").val();
        let expected = $(this).find("textarea[name='expected-result']").val();

        let step = {
          description: des,
          expected: expected,
        };
        if (des) steps.push(step);
      });
      if (steps.length === 0) {
        $.notify("Please add at least one step", "warn");
        return;
      }
      console.log(steps);
      console.log(JSON.stringify(steps))
      console.log(JSON.parse(JSON.stringify(steps)))
      const payload = {
        module_id: module,
        title: testCaseName,
        description: description,
        steps: JSON.stringify(steps),
        _csrf: CSRF_TOKEN,
      };

      console.log(payload);

      $.ajax({
        url: "./testcase",
        type: "POST",
        data: payload,
        success: function (data) {
          $.notify("Testcase created successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        error: function (error) {
          console.log(error);

          error = error.responseText;
          console.log(error);
          $.notify("Error creating requirement: Bad Input", "error");
        },
      });

      $("#testCasePopup").hide();
    });
  });
});

const account = {
  username: "lokiss",
};
