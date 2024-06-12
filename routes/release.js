"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/release");

router.get("/", controller.showAll);

module.exports = router;
