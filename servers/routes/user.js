"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.getUser);

module.exports = router;
