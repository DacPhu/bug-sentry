$(document).ready(function () {
  //   $("#addAttachPopup").fadeOut();

  //   $("#add-req").click(function () {
  //     console.log("click");
  //     $("#addAttachPopup").fadeIn(200);
  //   });

  $(".cancel-btn").click(function () {
    $("#addAttachmentModal").hide();
  });

  //   $(".save-btn").click(function () {
  //     $("#addAttachPopup").hide();
  //   });
});

// document
// .querySelector("#editAttachmentModal")
// .addEventListener("shown.bs.modal", () => {
//   document.querySelector("#nameEdit").focus();
// });

document
  .querySelector("#addAttachmentModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#name").focus();
  });

function confirmDelete(id) {
  $("#deleteAttachmentModal").data("attachment_id", id);
}

async function deleteConfirmed() {
  const attachment_id = $("#deleteAttachmentModal").data("attachment_id");
  console.log(attachment_id, CSRF_TOKEN);
  try {
    let res = await fetch(`/api/v1/attachment/${attachment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": CSRF_TOKEN,
      },
    });
    if (res.status == 204) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    console.log(error);
  }
}

async function downloadAttachment(attachment_id) {
  try {
    const link = document.createElement('a');
    link.href = `/download/attachment/${attachment_id}`;
    link.download = '';
    
    const headers = new Headers();
    
    const res = await fetch(link.href, { headers });

    if (res.status === 200) {
      link.click();
    } else {
      const resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    console.log(error);
  }
}