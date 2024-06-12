"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/module");

router.get("/", controller.getModules);
router.get("/all", controller.getAllModules);

module.exports = router;
