const express = require("express");
const app = express();
const port = 4000;
const expressHandleBars = require("express-handlebars");
const formatDate = require("./helpers/time");
const session = require("express-session");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const {
  errorHandler,
  authMiddleware,
  logMiddleware,
} = require("./middlewares");
const helpers = require("./helpers");
const middlewares = require("./middlewares");
require("dotenv").config();

app.use(express.static(__dirname + "/static/"));

// setting handlebars
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
      formatDate: helpers.formatDate,
      section: helpers.section,
    },
  })
);

app.use(
  session({
    secret: process.env.local.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logMiddleware);
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.set("view engine", "hbs");

// Routes
app.use("/", require("./routes/auth"));

app.use(authMiddleware.require_login);
app.use("/", require("./routes/home"));

app.use("/dashboard", require("./routes/dashboard"));
app.use("/project", require("./routes/project"));
app.use("/user", require("./routes/user"));
app.use("/role", require("./routes/role"));

app.use(errorHandler.notFoundHandler);
app.use(errorHandler.csrfErrorHandler);
app.use(errorHandler.generalErrorHandler);
app.listen(port, () =>
  console.log(`Example app listening on port ${port}! http://localhost:${port}`)
);
