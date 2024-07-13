"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/download");

router.get("/attachment/:id", controller.download_attachment);

module.exports = router;
