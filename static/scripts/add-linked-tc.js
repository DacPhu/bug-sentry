

var targetModule = "";
var sortField = "id";
var totalPage = 1;
(function (fn) {
    "use strict";
    fn(window.jQuery, window, document);
})(function ($, window, document) {
    "use strict";

    $(function () {
        targetModule = $('#modulesContainer .col').first().attr('id'); // Get first module's ID
        $('#modulesContainer .col').click(function () {
            targetModule = $(this).attr('id'); // Get clicked module's ID
            eventHandler.selectModule();
            // Loop through all other modules within the container
           
        });
        eventHandler.selectModule();



        $("#linked-popup").hide();
        $("#add-linked-popup").click(function () {
            $("#linked-popup").fadeIn(200);
        });

        eventHandler.initAllHandlers();
        $(".closePopup").click(function () {
            $("#linked-popup").hide();
        });

        $("#saveLinkedTC").click(function () {
            let checkedInput = $("input[name='chosen-tc']:checked")
            if (checkedInput.length === 0) {
                $.notify("Please select a test case to link", "warn");
                return;
            }
            $(".toast").show()
            // Append selected module and TC to the linked TC container

            // Hide the popup
            $("#linked-popup").hide();
        })
    });
});

const eventHandler = {
    changeSortField: function () {
        $("#sortFieldOptions a").click(function (e) {
            console.log(e.target.textContent)
            $("#sortField span").text(e.target.textContent);
            sortField = e.target.getAttribute("data-value");
            console.log(sortField)
            console.log($("#sortField").val())
            fetchAllTestcases()
        });
    },
    selectModule: function () {
        $('#modulesContainer .col').each(function () {
            var currentModuleId = $(this).attr('id');

            // Apply styles based on clicked module
            if (currentModuleId !== targetModule) {
                $(this).removeClass('font-weight-semibold').addClass('font-color-blur');
            } else {
                $(this).removeClass('font-color-blur').addClass('font-weight-semibold');
            }
        });
        fetchAllTestcases();
    },

    changeSortType: function () {
        $("#sortType").click(function (e) {
            if ($("#sortType").text().trim() === "Asc") {
                $("#sortType").html(`<span>
                    Desc
                </span>
                <img src="/icons/lucide_sort-desc.svg" alt="" />`);
            } else {
                $("#sortType").html(`<span>
                    Asc
                </span>
                <img src="/icons/lucide_sort-asc.svg" alt="" />`);
            }
            fetchAllTestcases()
        });
    },
    onNextPage: function () {
        $("#nextPage").click(function () {
            let currentPage = Number($("#page").text());
            if (currentPage >= totalPage) return;
            $("#page").text(currentPage + 1);
            fetchAllTestcases()
        });
    },
    onPreviousPage: function () {
        $("#previousPage").click(function () {
            let currentPage = Number($("#page").text());
            if (currentPage === 1) return;
            $("#page").text(currentPage - 1);
            fetchAllTestcases()
        });
    },
    initAllHandlers: function () {
        this.changeSortField();
        this.changeSortType();
        this.onNextPage();
        this.onPreviousPage();
    }
}

const fetchAllTestcases = async () => {
    // fetch API
    console.log($("#sortField"))
    const sortType = $("#sortType span").text().toLowerCase().trim();
    const page = $("#page").text().trim();

    console.log(sortField, sortType, page)
    fetch(`../testcase/api?module=${targetModule}&sortField=${sortField}&sortType=${sortType}&page=${page}`)
        .then(res => res.json())
        .then(data => {
            totalPage = data.totalPages;
            renderer.renderTestcases(data.testcases);
            console.log(data);
        })
        .catch(err => console.error(err))
    console.log("Fetching all testcases");
}

const renderer = {
    renderTestcases: function (testcases) {
        let html = "";
        for (const testCase of testcases) {
            html += `<tr>
                                        <td>
                                            <input class="ms-2 mt-1 checkbox-lg" size="" type="checkbox"
                                                name="chosen-tc" value="${testCase.id}" id="${testCase.id}" />
                                        </td>
                                        <th scope="row">
                                            <label for="${testCase.id}">${testCase.id}</label>
                                        </th>
                                        <td>${testCase.title}</td>
                                        <td>${testCase.steps.length}</td>
                                        <td>${testCase.Member.User.first_name}  ${testCase.Member.User.last_name} </td>
                                    </tr>`;
        }
        $("#testcaseBody").html(html);
    }
}