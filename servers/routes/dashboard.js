"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboard");

router.get("/", controller.showDashBoard);

module.exports = router;
