"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/user");

router.get("/", controller.getUsers);
router.get("/all", controller.getAllUsers);

module.exports = router;
