"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.getUserByEmail);
router.get("/all", controller.getAllUser);

module.exports = router;
