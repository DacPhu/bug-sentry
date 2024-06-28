"use strict";



const controller_attachment = require("../controllers/api/v1/attachment");
const controller_user = require("../controllers/api/v1/user");
const upload = require("../middlewares/upload");
const excelController = require("../controllers/excel");
const configUploadRoutes = (csrfProtection, app) => {


    app.post(
        "/api/v1/attachment/upload",
        upload.single("file"),
        csrfProtection,
        controller_attachment.uploadFile
    );

    
    app.put(
        "/api/v1/user",
        upload.single("file"),
        csrfProtection,
        controller_user.editUserInfo
    );

    app.get('/project/:id/requirement/export', excelController.exportRequirements);
    app.post('/project/:id/requirement/import', upload.single('file'), csrfProtection, excelController.importRequirements);

}


module.exports = configUploadRoutes;
