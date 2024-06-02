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
}

module.exports.require_tester = (req, res, next) => {
    if (req.session.role !== ROLES.PM_ROLE || req.session.role !== ROLES.TESTER_ROLE) {
        return res.status(403).send("You are not authorized to access this page");
    }
    next();
}