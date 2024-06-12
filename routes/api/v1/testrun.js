"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/testrun");

router.get("/", controller.getTestRuns);
router.get("/all", controller.getAllTestRuns);

module.exports = router;
