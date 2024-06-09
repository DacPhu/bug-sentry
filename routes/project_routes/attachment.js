const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/attachment");

router.get("/", controller.showAll);
router.get("/:requirement_id",controller.showAll);


module.exports = router;