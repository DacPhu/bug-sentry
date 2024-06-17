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

module.exports.be_in_project = (req, res, next) => {
  const projectId = req.params.id;
  if (!req.session.projects[projectId]) {
    return res.status(403).send("You are not authorized to access this page");
  }
  req.session.projectId = projectId;
  req.session.projectRole = req.session.projects[projectId].role;
  req.session.memberId = req.session.projects[projectId].memberId;

  next();
}
module.exports.injectRole = (req, res, next) => {
  res.locals.fullname = req.session.fullname;
  res.locals.role = req.session.role;
  res.locals.username = req.session.username;
  next();
};
