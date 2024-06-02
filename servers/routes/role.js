"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/role");

router.get("/", controller.getRole);
router.get("/all", controller.getAllRole);

module.exports = router;
