"use strict";

const controller = {};
const models = require("../../../models");
const notificationController = require('./notification');

controller.addTestRun = async (req, res) => {

    const { projectId, title, assignedTo, testCase, release } = req.body;
    // console.log(req.session.projects[projectId].memberId)
    const createdBy = req.session.projects[projectId].memberId
    try {
        const newTestRun = await models.TestRun.create({
            project_id: projectId,
            name: title,
            status: "untested",
            release_id: release,
            test_case_id: testCase, 
            tester_id: assignedTo, 
            created_by: createdBy,
        });
        models.Activity.create({
            project_id: projectId,
            user_id: req.session.userId,
            title_name: `Create testrun ${title}`,
            member_id: req.session.memberId,
            action: 'create',
            time : new Date()
        });
        
        console.log('Test Run created:', newTestRun.toJSON());

        const notificationData = {
            name: `New Test Run: ${title}`,
            user_id: createdBy,
            project_id: projectId,
            content: `a new test run titled "${title}".`
        };

        const reqForNotification = { body: notificationData, io: req.io };
        const resForNotification = {
            status: (statusCode) => ({
                json: (data) => console.log('Notification response:', statusCode, data)
            })
        };
        await notificationController.sendNotification(reqForNotification, resForNotification);
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
  
controller.getAllTestRunsInProject = async (req, res) => {
    try {
        const testRuns = await models.TestRun.findAll({
            where : {id: req.params.id} 
        });

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
    const { projectId, title, assignedTo, testCase, release, status } = req.body;
    const id = req.params.id
    try {
        const testRun = await models.TestRun.findByPk(id);
        if (projectId !== undefined) testRun.project_id = projectId;
        if (title !== undefined) testRun.name = title;
        if (assignedTo !== undefined) testRun.tester_id = assignedTo;
        if (testCase !== undefined) testRun.test_case_id = testCase;
        if (release !== undefined) testRun.release_id = release;
        if (status !== undefined) testRun.status = status;
        if (status !== undefined) {
            models.Activity.create({
                project_id: testRun.project_id,
                user_id: req.session.userId,
                title_name: `Change testrun ${testRun.name} status to ${status}`,
                member_id: req.session.memberId,
                action: 'edit',
                time : new Date()
            });
        }
        
        await testRun.save();
        console.log('Test Run updated:', testRun.toJSON());
        return res.status(200).json(testRun);
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}

controller.deleteTestRun = async(req, res) => {
    console.log(req.params.id)
    try {
        const testRun = await models.TestRun.findByPk(req.params.id)
        if (!testRun) {
            return res.status(404).send("Test run not found");
        }
        models.Activity.create({
            project_id: testRun.project_id,
            user_id: req.session.userId,
            title_name: `Delete testrun ${testRun.name}`,
            member_id: req.session.memberId,
            action: 'delete',
            time : new Date()
        });

        await testRun.destroy();
        req.flash("success", `Delete test run ${testRun.name} successfully!`);
        res.status(204).send();
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
}
module.exports = controller;
