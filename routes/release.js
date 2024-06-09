"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/release");

router.get("/api", controller.getReleasesAPI);
// router.get("/all", controller.getAllRole);

module.exports = router;
