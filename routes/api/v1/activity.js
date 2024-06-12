"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/activity");

router.get("/", controller.getActivities);
router.get("/all", controller.getAllActivities);

module.exports = router;
