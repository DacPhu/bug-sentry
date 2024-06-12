"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/project");

router.get("/", controller.getProjects);
router.get("/all", controller.getAllProjects);
router.post("/", controller.addProject);
router.put("/", controller.editProject);
router.delete("/:id", controller.deleteProject);

module.exports = router;
