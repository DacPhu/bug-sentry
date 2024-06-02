"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboard_controller");

router.get("/", controller.showDashBoard);

module.exports = router;
