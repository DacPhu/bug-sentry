(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";
  $(function () {
    // Click event handler for the "Add" button
    $("#projectPopup").hide();
    $("#add-project").click(function () {
      $("#projectPopup").show();
      $("body").css("overflow", "hidden"); // Disable scrolling
      $("#projectPopup textarea[name='project-name']").focus(); // Focus on the textarea
    });

    // Click event handler for the close button
    $(".closePopup").click(function () {
      $("#projectPopup").hide();
      $("body").css("overflow", "auto"); // Enable scrolling
    });

    // Click event handler for creating the project
    $("#createProject").click(function () {
      var projectName = $("#projectPopup textarea[name='project-name']").val();
      var createdBy = account.username;
      var createdAt = new Date().toISOString();

      if (!projectName) {
        alert("Please fill all the fields");
        return;
      }

      alert("Project created successfully");

      $("#projectPopup").hide();
      $("body").css("overflow", "auto"); // Enable scrolling
    });
  });

  const account = {
    username: "Dac Phu",
  };
});
