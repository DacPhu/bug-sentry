"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/administration");

router.post("/addUser", require(controller.addUserToProject));

module.exports = router;
