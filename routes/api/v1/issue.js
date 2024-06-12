"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/issue");

router.get("/", controller.getIssues);
router.get("/all", controller.getAllIssues);
router.post("/", controller.addIssue);
router.put("/", controller.editIssue);
router.delete("/:id", controller.deleteIssue);

module.exports = router;
