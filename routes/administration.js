"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/administration");


router.post("/add-user", require(controller.addUserToProject));

module.exports = router;
