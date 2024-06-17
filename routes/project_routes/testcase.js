const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../../controllers/testcase");

const { require_tester, require_pm } = require("../../middlewares/auth");

router.use(require_tester)
router.get("/", controller.showAll);
router.get("/api", controller.getTestCasesAPI);
router.post("/", controller.createTestCase);
router.delete("/:testcase_id", controller.deleteTestCase);



// router.post("/", controller.createRequirement);
// router.get("/:testcase_id",  controller.getDetailRequirement);
// router.delete("/:testcase_id",  controller.deleteRequirement);


module.exports = router;
