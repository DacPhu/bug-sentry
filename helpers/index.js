const sectionHelpers = require("./section");
const timeHelper = require("./time");
module.exports = {
    section: sectionHelpers.section,
    formatDate : timeHelper.formatDate,
    lessThan: function(a, b) {
        return a < b;
    }
};