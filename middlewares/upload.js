const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     console.log("DEBUG", req.body);
//     const allowedTypes = [
//       "image/png",
//       "image/jpg",
//       "image/jpeg",
//       "application/pdf",
//       "text/plain",
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     ];
//     if (!allowedTypes.includes(file.mimetype)) {
//       const error = new Error("Incorrect file type");
//       error.status = 400;
//       return cb(error, false);
//     }
//     cb(null, true);
//   },
// });

module.exports = upload;
