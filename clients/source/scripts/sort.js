(function (fn) {
  "use strict";
  fn(window.jQuery, window, document);
})(function ($, window, document) {
  "use strict";

  $(function () {
    $(".sort-btn").on("click", "[data-sort]", function (event) {
      event.preventDefault();

      var $this = $(this),
        sortDir = "desc";

      if ($this.data("sort") !== "asc") {
        sortDir = "asc";
      }

      $this
        .data("sort", sortDir)
        .find(".fa")
        .attr("class", "fa fa-sort-" + sortDir);

      // call sortDesc() or sortAsc() or whathaveyou...
    });
  });
});
