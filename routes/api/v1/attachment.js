"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/attachment");

router.get("/", controller.getAttachments);
router.get("/all", controller.getAllAttachments);

module.exports = router;