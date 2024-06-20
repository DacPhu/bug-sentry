async function deleteConfirmed() {
  const attachment_id = $("#deleteAttachmentModal").data("attachment_id");
  console.log(module_id, CSRF_TOKEN);
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
