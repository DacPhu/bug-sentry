"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/attachment");
const upload = require("../../../middlewares/upload");

router.get("/", controller.getAttachments);
router.get("/all", controller.getAllAttachments);
router.delete("/:id", controller.deleteAttachment);

module.exports = router;
