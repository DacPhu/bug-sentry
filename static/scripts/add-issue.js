$(document).ready(function() {
    // Ẩn bảng thêm vấn đề khi trang được tải
    $('.add-issue-table').fadeOut();
  
    // Xử lý sự kiện khi nhấp vào nút "Add Issue"
    $('#add-issue-btn').click(function() {
      $('.content').fadeIn();
      $('.overlay').fadeIn();
      $('.add-issue-table').fadeIn();
    });
  
    // Xử lý sự kiện khi nhấp vào nút "Cancel"
    $('#cancel-issue-btn').click(function() {
      // Ẩn bảng thêm vấn đề
      $('.add-issue-table').fadeOut();
      $('.overlay').fadeOut();
      // Hiện lại trang hiện tại
      $('.content').fadeIn();
    });
    $('#save-issue-btn').click(function() {
      // Ẩn bảng thêm vấn đề
      $('.add-issue-table').fadeOut();
      $('.overlay').fadeOut();
      // Hiện lại trang hiện tại
      $('.content').fadeIn();
    });
  });