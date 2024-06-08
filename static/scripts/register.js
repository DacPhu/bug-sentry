(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";

  $(function () {

    let button = $("#button_signup");
    
    function buttonclick(e) {
      let check = 1;
      let countGender = 0;
      let input = $("input");
      console.log(input);
      for (let i = 0; i < input.length; i++) {
        if (input[i].name == "male" || input[i].name == "female") {
          if (!input[i].checked) {
            if (countGender === 0) countGender++;
            else {
              console.log(countGender);
              check = 0;
              break;
            }
          }
        }
        if (!input[i].value && input[i].name !== "birthday") {
          check = 0;
          break;
        }
      }

      if (check && $("#signup_password").val() !== $("#signup_password_again").val()) { 
        e.preventDefault();
        $.notify("Password not match", "error");
        countGender = 0;
   
        return;
      }

      if (!check || countGender === 0) {
        e.preventDefault();
        $.notify("Please fill in all fields", "error");
        countGender = 0;
   
        return;
      }
      
      if (!$("#signup_email")[0].checkValidity()) return;
      $(".loader").removeClass("hidden");
      e.target.classList.add("hidden");
    }
    button.on("click", buttonclick);

  });
});
