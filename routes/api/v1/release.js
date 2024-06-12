"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/release");

router.get("/", controller.getReleases);
router.get("/all", controller.getAllReleases);
router.post("/", controller.addRelease);
router.put("/", controller.editRelease);
router.delete("/", controller.deleteRelease);

module.exports = router;
