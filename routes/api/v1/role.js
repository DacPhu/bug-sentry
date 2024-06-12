"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/role");

router.get("/all", controller.getAllRoles);

module.exports = router;
