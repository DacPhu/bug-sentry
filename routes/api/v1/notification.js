"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/notification");
// routes /api/v1/notification
router.post("/", controller.sendNotification);
router.get("/", controller.receiveNotification);

module.exports = router;
