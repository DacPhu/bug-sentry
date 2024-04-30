const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let button = $("#button_signup");
var warning = $("#warning_signup");
//let input=document.querySelectorAll("input")
function buttonclick(e) {
  let check = 1;
  let countGender = 0;
  let input = $$("input");
  console.log(input);
  for (let i = 0; i < input.length; i++) {
    if (input[i].name == "male" || input[i].name == "female") {
      if (!input[i].checked) {
        if (countGender == 0) countGender++;
        else {
          console.log(countGender);
          check = 0;
          break;
        }
      }
    }
    if (!input[i].value && input[i].name != "birthday") {
      check = 0;
      break;
    }

    // console.log(input[i])
    // console.log("hi")
    //else  if(!input[i].value && input[i].name!="gender" &&input[i].name!="birthday")
  }
  if (
    check &&
    $("#signup_password").value != $("#signup_password_again").value
  ) {
    e.preventDefault();
    warning.classList.remove("successSignup");
    warning.textContent = "Password incorrect!";
    countGender = 0;
    setTimeout(() => {
      warning.textContent = "";
    }, 3000);
    return;
  }

  if (!check || countGender == 0) {
    e.preventDefault();
    warning.classList.remove("successSignup");
    warning.textContent = "Please fill all field!";
    countGender = 0;
    setTimeout(() => {
      warning.textContent = "";
    }, 3000);
    return;
  }
  if (!$("#signup_email").validity.valid) return;
  $(".loader").classList.remove("hidden");
  e.target.classList.add("hidden");
}
button.addEventListener("click", buttonclick);
function success() {
  warning.classList.add("successSignup");
  warning.innerHTML =
    "Register Successfully !  <a href=./login.html>Login</a> ";
}
function error(mess) {
  warning.textContent = mess;
  setTimeout(() => {
    warning.textContent = "";
  }, 3000);
}
