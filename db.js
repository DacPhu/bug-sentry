
let models = require("./models");
models.sequelize.sync({ force: true }).then(() => {
    console.log("Tables created!");
    process.exit(0); // Kết thúc chương trình với mã trạng thái 0 (thành công)
}).catch(error => {
    console.error("Error:", error);
    process.exit(1); // Kết thúc chương trình với mã trạng thái 1 (có lỗi)
});