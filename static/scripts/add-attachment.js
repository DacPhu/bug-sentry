
$(document).ready(function() {
    $("#addAttachPopup").fadeOut();

    $("#add-req").click(function () {
        console.log("click");
        $("#addAttachPopup").fadeIn(200);
      });

    $(".cancel-btn").click(function () {
        $("#addAttachPopup").hide();
    });
    
    $(".save-btn").click(function () {
        $("#addAttachPopup").hide();
    });
})