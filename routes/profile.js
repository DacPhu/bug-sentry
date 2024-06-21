"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile");

router.get("/edit-profile", controller.showEditProfileForm);
router.get("/edit-password", controller.showEditPasswordForm);

module.exports = router;
