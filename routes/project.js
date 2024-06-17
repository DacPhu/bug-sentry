"use strict";

const express = require("express");
const router = express.Router();

const testcase_controller = require("../controllers/testcase");
const testrun_controller = require("../controllers/testrun");
const module_controller = require("../controllers/module");
const issue_controller = require("../controllers/issue");
const project_controller = require("../controllers/project");
const release_controller = require("../controllers/release");
const administration_controller = require("../controllers/administration");
const activity_controller = require("../controllers/activity");
const { requirement_router, attachment_router,testcase_router  } = require("./project_routes");

const {
  require_pm,
  require_tester,be_in_project
} = require("../middlewares/auth");

router.get("/", project_controller.showAll);

router.get("/add-user", administration_controller.showAddUserForm);

router.use("/:id", be_in_project);
router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) res.redirect(`/${id}/overview`);
});


router.get("/:id/overview", project_controller.showOverview);
router.get(
  "/:id/administration",
  require_pm,
  administration_controller.showAll
);

router.get("/:id/testrun", require_tester, testrun_controller.showAll);
router.use("/:id/testcase", testcase_router);
router.get("/:id/module", require_tester, module_controller.showAll);
router.use("/:id/requirement", requirement_router);
router.get("/:id/issue", issue_controller.showAll);
router.get("/:id/release", release_controller.showAll);
router.get("/:id/activity-log", require_pm, activity_controller.showAll);
router.use("/:id/attachment", require_tester, attachment_router);

module.exports = router;
