"use strict";

const controller = {};
const models = require("../../../models");
controller.addTestRun = async (req, res) => {

    const { projectId, title, assignedTo, testCase, release } = req.body;
    const createdBy = req.session.userId
    console.log(projectId, createdBy, title, assignedTo, testCase, release)
    try {
        // Tìm thành viên assignee và creator
        const assignee = await models.Member.findOne({
            where: {user_id : assignedTo}
        });
        const creator = await models.Member.findOne({
            where: {user_id : createdBy}
        });
        
        
        // Tìm test case
        const testCaseInstance = await models.TestCase.findByPk(testCase);
        const releaseInstance = await models.Release.findByPk(release)
        const newTestRun = await models.TestRun.create({
            project_id: projectId,
            name: title,
            status: "untested",
            // release_id: release,
        });
        await newTestRun.setAssignee(assignee);
        await newTestRun.setCreator(creator);
        await newTestRun.setTestCase(testCaseInstance);
        await newTestRun.setRelease(releaseInstance)

        console.log('Test Run created:', newTestRun.toJSON());
        res.redirect(`/project/${projectId}/testrun`)
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}
controller.getTestRuns = async (req, res) => {
    const name = req.query.keyword | "";
    const projectId = req.query.projectId | 0;
    const page = parseInt(req.query.page) | 1;
    const size = parseInt(req.query.size) | 0;

    try {
        let whereClause = {};

        whereClause = {
        [models.Sequelize.Op.and]: [
            { name: { [models.Sequelize.Op.like]: `%${name}%` } },
            { project_id: projectId },
        ],
        };

        const limit = size;
        const offset = (page - 1) * size;

        const { count, rows: testRuns } = await models.TestRun.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        });

        if (!testRuns || testRuns.length === 0) {
        return res.status(404).json({ message: "No test runs found" });
        }

        return res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        testRuns: testRuns,
        });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};
  
controller.getAllTestRuns = async (req, res) => {
    try {
        const testRuns = await models.TestRun.findAll();

        if (!testRuns || testRuns.length === 0) {
        return res.status(404).json({ message: "No test runs found" });
        }

        return res.status(200).json({
            testRuns: testRuns,
        });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
};
controller.editTestRun = async(req, res) => {
    console.log(req.params.id)
    try {
        const testRun = await models.TestRun.findByPk(req.params.id);
        if (!testRun) {
            return res.status(404).json({ message: "Test run not found" });
        }
        const testCase = await models.TestCase.findByName(req.body.testcase)
        const updatedData = {
            createdBy: req.body.createdBy,
            name: req.body.title,
            assignedTo: req.body.assignedTo,
            testcase: req.body.testcase,
        };
        await testRun.update(updatedData);
        return res.status(200).json(testRun);

    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}
module.exports = controller;
