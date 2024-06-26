const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/attachment");

const { require_tester } = require("../../middlewares/auth");

router.get("/", require_tester, controller.showAll);
router.get("/:requirement_id", require_tester, controller.showAll);

module.exports = router;
