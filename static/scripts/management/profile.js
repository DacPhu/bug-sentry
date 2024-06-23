async function editProfile(e) {
  e.preventDefault();
  const formData = new FormData(document.getElementById("editProfileForm"));
  let data = Object.fromEntries(formData.entries());
  console.log("PROFILE", data);

  try {
    let response = await fetch("/api/v1/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      alert("Update profile successfully !");
      location.reload();
    } else {
      let responseMessage = await response.text();
      throw new Error(responseMessage);
    }
  } catch (error) {
    e.target.querySelector("#errorMessage").innerText =
      "Can not update user profile!";
    console.error("Error updating user profile: ", error);
  }
}
