async function editPassword(e) {
  e.preventDefault();
  const formData = new FormData(document.getElementById("editPasswordForm"));
  let data = Object.fromEntries(formData.entries());
  let valid = await checkPasswordValid();
  console.log(data);
  if (valid == false) {
    return;
  }
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
      location.reload();
    } else {
      let responseMessage = await response.text();
      throw new Error(responseMessage);
    }
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText =
      "Can not update user information !";
    console.error("Error updating user information: ", error);
  }
}

async function checkPasswordValid() {
  let currentPassword = document.getElementById("current-password").value;
  let newPassword = document.getElementById("new-password").value;
  let confirmNewPassword = document.getElementById(
    "confirm-new-password"
  ).value;
  let errorMessage = document.getElementById("errorMessage");

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    errorMessage.innerText = "Please fill all fields!";
    return false;
  }

  if (newPassword.length < 8) {
    errorMessage.innerText = "Password must be at least 8 characters!";
    return false;
  }

  fetch("/api/v1/user/check-password", {
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
      } else {
        errorMessage.innerText = "Incorrect password!";
        return false;
      }
    })
    .catch((error) => {
      errorMessage.innerText = "Error checking password!";
      console.error("Error checking password: ", error);
    });

  if (newPassword !== confirmNewPassword) {
    errorMessage.innerText = "Password and Confirm Password must be the same !";
    return false;
  } else {
    errorMessage.innerText = "";
    return true;
  }
}
