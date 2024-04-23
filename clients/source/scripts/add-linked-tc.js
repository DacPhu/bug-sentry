$('#modulesContainer .col').click(function () {
    var clickedModuleId = $(this).attr('id'); // Get clicked module's ID

    // Loop through all other modules within the container
    $('#modulesContainer .col').each(function () {
        var currentModuleId = $(this).attr('id');

        // Apply styles based on clicked module
        if (currentModuleId !== clickedModuleId) {
            $(this).removeClass('font-weight-semibold').addClass('font-color-blur');
        } else {
            $(this).removeClass('font-color-blur').addClass('font-weight-semibold');
        }
    });
});


$("#linked-popup").hide();
$("#add-linked-popup").click(function () {
  $("#linked-popup").fadeIn(200);
});


$(".closePopup").click(function () {
            $("#linked-popup").hide();
        });