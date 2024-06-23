async function editPassword(e) {
  e.preventDefault();
  const formData = new FormData(document.getElementById("editPasswordForm"));
  let data = Object.fromEntries(formData.entries());
  let valid = await checkPasswordValid(e);
  if (valid == false) {
    console.log("Password is not valid !");
    return;
  }
  console.log("Password is valid !");

  try {
    let response = await fetch("/api/v1/user/edit-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": CSRF_TOKEN,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      alert("Update password successfully !");
      window.location.href = "/logout";
    } else {
      let responseMessage = await response.text();
      throw new Error(responseMessage);
    }
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText =
      "Can not update user password !";
    console.error("Error updating user password: ", error);
  }
}

async function checkPasswordValid(e) {
  let currentPassword = document.getElementById("current-password").value;
  let newPassword = document.getElementById("new-password").value;
  let confirmNewPassword = document.getElementById(
    "confirm-new-password"
  ).value;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    e.target.querySelector("#errorMessage").innerText =
      "Please fill all fields!";
    return false;
  }

  if (newPassword.length < 8 || currentPassword.length < 8) {
    e.target.querySelector("#errorMessage").innerText =
      "Password must be at least 8 characters!";
    return false;
  }

  let check = false;

  await fetch("/api/v1/user/check-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": CSRF_TOKEN,
    },
    body: JSON.stringify({ currentPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.valid) {
        errorMessage.innerText = "";
        check = true;
      } else {
        e.target.querySelector("#errorMessage").innerText =
          "Incorrect password!";
      }
    })
    .catch((error) => {
      e.target.querySelector("#errorMessage").innerText =
        "Error checking password!";
      console.error("Error checking password: ", error);
    });
  if (check == false) {
    return false;
  }

  if (newPassword === currentPassword) {
    e.target.querySelector("#errorMessage").innerText =
      "New password must be different from current password!";
    return false;
  }

  if (newPassword !== confirmNewPassword) {
    e.target.querySelector("#errorMessage").innerText =
      "Password and Confirm Password must be the same !";
    return false;
  } else {
    e.target.querySelector("#errorMessage").innerText = "";
    return true;
  }
}
