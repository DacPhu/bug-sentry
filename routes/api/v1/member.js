"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/member");

router.get("/:id", controller.getMembersInProject);
module.exports = router;
