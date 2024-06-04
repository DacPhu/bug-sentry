$(document).ready(function() {
    const linkedPopup = $('#linked-popup');
    const addTestRunBtn = $('#add-testrun-btn');
    const saveBtn = $('.save-btn');
    const cancelBtn = $('.cancel-btn');

    saveBtn.click(function() {
        linkedPopup.hide();
    });

    cancelBtn.click(function() {
        linkedPopup.hide();
    });

    addTestRunBtn.click(function() {
        linkedPopup.show();
    });
});