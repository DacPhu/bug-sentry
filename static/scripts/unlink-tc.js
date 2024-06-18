function confirmDelete(id) {

    $("#deleteConfirmationModal").modal("show");
    $("#deleteConfirmationModal").data("test_case_id", id);
  }


  function deleteConfirmed() {
    // having input _csrf  in body and ajax request
    const testcase_id = $("#deleteConfirmationModal").data("test_case_id");
    $("#actions-delete-requirement").hide();
    $("#action-delete-load-requirement").show();
    const requirementId = window.location.pathname.split("/").pop();
    $.ajax({
      url: `./${requirementId}/remove/${testcase_id}`,
      type: "DELETE",
      data: {
        _csrf: CSRF_TOKEN,
      },
      success: function (data) {
        $.notify("Testcase unlinked successfully", "success");
        setTimeout(() => {
          window.location.reload();

        }, 1000);
      },
      error: function (error) {
        $.notify("Error deleting requirement: ", error, "error");
        $("#actions-delete-requirement").show();
        $("#action-delete-load-requirement").hide();

      },
    });

    //

  }