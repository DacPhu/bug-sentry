

const ExcelJS = require('exceljs');
"use strict";

const controller = {};
const models = require("../models");
const multer = require('multer');
const { raw } = require('express');
const { format } = require('sequelize/lib/utils');
const upload = multer({ dest: 'uploads/' });
const { Sequelize } = require('sequelize');
controller.exportRequirements = async (req, res) => {
  try {
    const projectId = req.params.id;
    const requirements = await models.Requirement.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: models.Module,
          attributes: ['name']
        },
        {
          model: models.Member,
          include: [
            {
              model: models.User,
              required: false,
              attributes: ['username']
            },
          ],
          required: false,
        },
      ],
    });
    console.log(requirements);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Requirements');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'URL', key: 'url', width: 30 },
      { header: 'Module', key: 'module', width: 20 },
      { header: 'Created By', key: 'created_by', width: 20 },
      { header: 'Created At', key: 'created_at', width: 20 }
    ];

    requirements.forEach(requirement => {
      console.log(requirement);
      worksheet.addRow({
        id: requirement.id,
        name: requirement.name,
        description: requirement.description,
        url: requirement.url,
        module: requirement.Module?.name,
        created_by: requirement.Member.User ? requirement.Member.User.username : 'N/A',
        created_at: requirement.created_at
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=requirements.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error exporting requirements:", error);
    res.status(500).send("An error occurred while exporting requirements.");
  }
};






controller.importRequirements = async (req, res) => {
  const projectId = req.params.id;
  try {
    
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    console.log(file);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1);

    const requirements = [];
    worksheet.eachRow((row, rowNumber) => {
      const module_name = row.getCell(5).value;
      // find with like %% 
      const module = models.Module.findOne({ where: { name: { [Sequelize.Op.like]: '%' + module_name + '%' } } });


      if (rowNumber > 1) {
        const requirement = {
          project_id: projectId,
          name: row.getCell(2).value,
          description: row.getCell(3).value || '',
          url: row.getCell(4).value || '',
          module_id: module.id, // Assuming module ID is provided
          created_by: req.session.memberId,
        };
        requirements.push(requirement);
      }
    });

    await models.Requirement.bulkCreate(requirements);

    req.flash("success", "Imported requirements successfully!");
    res.redirect(`/project/${projectId}/requirement`);
  } catch (error) {
    console.error("Error importing requirements:", error);
    req.flash("error", "The import failed. Please check the file and try again");
    res.redirect(`/project/${projectId}/requirement`);
  }
};


module.exports = controller;

