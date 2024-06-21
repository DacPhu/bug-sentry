const moment = require("moment");

const formatDate = function (dateString, format) {
  console.log(dateString);
  return moment(dateString).format(format);
};

module.exports = {formatDate};
