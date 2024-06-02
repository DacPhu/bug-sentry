const express = require("express");
const app = express();
const port = 4000;
const expressHandleBars = require("express-handlebars");
const formatDate = require("./helpers/timeHelpers");

app.use(express.static(__dirname + "/static/"));

// setting handle bars
app.engine(
  "hbs",
  expressHandleBars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: "hbs",
    defaultLayout: "main_layout",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      formatDate: formatDate,
    },
  })
);

app.set("view engine", "hbs");

app.use("/", require("./routes/home"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/project", require("./routes/project"));
app.use("/user", require("./routes/user"));

app.use((req, res) => {
  res.send("Request not found");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.send("Server error");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
