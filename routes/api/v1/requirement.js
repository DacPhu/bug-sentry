"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/requirement");

router.get("/", controller.getRequirements);
router.get("/all", controller.getAllRequirements);

module.exports = router;
