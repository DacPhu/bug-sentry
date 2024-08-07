"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/member");

router.get("/:id", controller.getMembersInProject);
router.post("/add-user", controller.addUserToProject);

module.exports = router;
