"use strict";

const express = require("express");
const router = express.Router();

const testcase_controller = require("../controllers/testcase");
const testrun_controller = require("../controllers/testrun");
const requirement_controller = require("../controllers/requirement");
const module_controller = require("../controllers/module");
const issue_controller = require("../controllers/issue");
const project_controller = require("../controllers/project");
const release_controller = require("../controllers/release");
const administration_controller = require("../controllers/administration");
const attachment_controller = require("../controllers/attachment");
const activity_controller = require("../controllers/activity");
const { requirement_router } = require("./project_routes");
router.get("/", project_controller.showAll);

router.get("/add-user", administration_controller.showAddUserForm);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) res.redirect(`/${id}/overview`);
});

router.get("/:id/overview", project_controller.showOverview);
router.get("/:id/administration", administration_controller.showAll);

router.get("/:id/testrun", testrun_controller.showAll);
router.get("/:id/testcase", testcase_controller.showAll);
router.get("/:id/module", module_controller.showAll);
router.use("/:id/requirement", requirement_router);
router.get("/:id/issue", issue_controller.showAll);
router.get("/:id/release", release_controller.showAll);
// router.get("/:id/attachment", attachment_controller.showAll);
router.get("/:id/activity-log", activity_controller.showAll);

module.exports = router;
