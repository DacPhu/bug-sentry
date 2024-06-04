const moment = require("moment");

const formatDate = function (dateString, format) {
  return moment(dateString).format(format);
};

module.exports = {formatDate};
