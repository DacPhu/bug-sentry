const sectionHelpers = require("./section");
const timeHelper = require("./time");
module.exports = {
    section: sectionHelpers.section,
    formatDate : timeHelper.formatDate,
    lessThan: function(a, b) {
        return a < b;
    },
    greaterThan: function(a, b) {
        return a > b;
    },
    equals: function(a, b) {
        return a === b;
    },
    equalsStr: function(a, b) {
        try {
            return a.trim() == b.trim();
        }catch(e) {
            return false;
        }
    },
    weakEquals: function(a, b) {
        return a == b;
    },
    notEquals: function(a, b) {
        return a != b;
    },
    and: function(a, b) {
        return a && b;
    },
    or: function(a, b) {
        return a || b;
    },
    leq : function(a, b) {
        return a <= b;
    },
    inc: function(value, options) {
        return parseInt(value) + 1;
    },
    dec: function(value, options) {
        return parseInt(value) - 1;
    },
    modEqual : function(a, b, c) {
        return a % b == c;
    },

};