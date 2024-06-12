"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/api/v1/board");

router.get("/", controller.getBoards);
router.get("/all", controller.getAllBoards);

module.exports = router;
