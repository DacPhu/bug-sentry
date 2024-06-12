"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/testcase");

router.get("/", controller.getTestCases);
router.get("/all", controller.getAllTestCases);

module.exports = router;
