const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/requirement");

const { require_tester, require_pm } = require("../../middlewares/auth");

router.use(require_tester)
router.get("/", controller.showAll);
router.post("/", controller.createRequirement);
router.get("/:requirement_id",  controller.getDetailRequirement);
router.delete("/:requirement_id",  controller.deleteRequirement);


module.exports = router;
