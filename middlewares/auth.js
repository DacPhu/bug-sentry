const { model } = require("mongoose");
const ROLES = require("../constants/roles");

module.exports.require_login = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

module.exports.require_pm = (req, res, next) => {
  if (req.session.role !== ROLES.PM_ROLE) {
    return res.status(403).send("You are not authorized to access this page");
  }
  next();
};

module.exports.require_tester = (req, res, next) => {
  console.log("HERE", req.session.role);
  if (
    req.session.role !== ROLES.PM_ROLE &&
    req.session.role !== ROLES.TESTER_ROLE
  ) {
    return res.status(403).send("You are not authorized to access this page");
  }
  next();
};

module.exports.injectRole = (req, res, next) => {
  res.locals.fullname = req.session.fullname;
  res.locals.role = req.session.role;
  res.locals.username = req.session.username;
  next();
};
