


(function (fn) {
    "use strict";
    fn(window.jQuery, window, document);
})(function ($, window, document) {
    "use strict";

    $(function () {
        $(".closePopup").click(function () {
            $("#addReqPopup").hide();
            $("#editReqPopup").hide();
        });
        $("#saveRequirement").click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            let module = $("select[name='module_id']").val();
            if (module === "") {
                $.notify("Please select a module", "warn");
                return;
            }
            let requirementName = $("input[name='name']").val();
            if (requirementName === "") {
                $.notify("Please enter a requirement name", "warn");
                return;
            }
            
            $.notify("Add requirement successfully", "success");
            // Hide the popup
            $("#addReqPopup").hide();
            $("#requirementForm").submit();
        });        
       
    });
});