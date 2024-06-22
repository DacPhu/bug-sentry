"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/user");

router.get("/", controller.getUsers);
router.get("/all", controller.getAllUsers);

router.post("/check-password", controller.checkPassword);

router.put("/edit-profile", controller.editUserInfo);
router.put("/edit-password", controller.editUserPassword);

module.exports = router;
