"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/testrun");

// routes /api/v1/testrun
router.post("/", controller.addTestRun);

router.get("/", controller.getTestRuns);
router.get("/:id", controller.getAllTestRunsInProject);
router.put("/:id", controller.editTestRun);

router.delete("/:id", controller.deleteTestRun);

module.exports = router;
