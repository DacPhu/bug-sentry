const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/requirement");

const { require_tester, require_pm } = require("../../middlewares/auth");

router.use(require_tester)
router.get("/", controller.showAll);
router.post("/", controller.createRequirement);
router.post("/edit", controller.editRequirement);

router.get("/:requirement_id",  controller.getDetailRequirement);
router.delete("/:requirement_id",  controller.deleteRequirement);
router.post("/:requirement_id/linked/api", controller.addLinkedTestCasesAPI);
router.delete("/:requirement_id/remove/:testcase_id", controller.removeLinkedTestCaseAPI);

module.exports = router;
