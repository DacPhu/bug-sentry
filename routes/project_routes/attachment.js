const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/attachment");

router.get("/", controller.showAll);


module.exports = router;