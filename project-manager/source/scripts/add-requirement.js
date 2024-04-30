


(function (fn) {
    "use strict";
    fn(window.jQuery, window, document);
})(function ($, window, document) {
    "use strict";

    $(function () {
        $(".closePopup").click(function () {
            $("#addReqPopup").hide();
        });
        $("#saveRequirement").click(function () {
            let module = $("select[name='module']").val();
            if (module === "") {
                $.notify("Please select a module", "warn");
                return;
            }
            let requirementName = $("input[name='requirementName']").val();
            if (requirementName === "") {
                $.notify("Please enter a requirement name", "warn");
                return;
            }
            
            $.notify("Add requirement successfully", "success");
            // Hide the popup
            $("#addReqPopup").hide();
        });        
       
    });
});