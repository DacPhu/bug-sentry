$(document).ready(function () {
    // Function để hiển thị form add issue
    $("#add-issue-btn").click(function () {
        $(".overlay").show(); // hiển thị overlay
        $(".add-issue-table").show(); // hiển thị add issue table
    });

    // Function để save issue
    $("#save-issue-btn").click(function () {
        $(".overlay, .add-issue-table").hide(); // ẩn overlay và add issue table
    });

    // Function để cancel add issue
    $("#cancel-issue-btn").click(function () {
        $(".overlay, .add-issue-table").hide(); // ẩn overlay và add issue table
    });
});