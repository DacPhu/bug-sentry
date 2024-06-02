"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/home_controller");

router.get("/", controller.showHomePage);

module.exports = router;
