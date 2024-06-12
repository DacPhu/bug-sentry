"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/issue");

router.get("/", controller.getIssues);
router.get("/all", controller.getAllIssues);

module.exports = router;
