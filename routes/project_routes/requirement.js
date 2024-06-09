const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/requirement");

router.get("/", controller.showAll);
router.get("/:requirement_id", controller.getDetailRequirement);


module.exports = router;