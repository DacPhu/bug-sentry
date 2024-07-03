const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 4000;

const expressHandleBars = require("express-handlebars");
const formatDate = require("./helpers/time");
const session = require("express-session");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const {
  errorHandler,
  authMiddleware,
  logMiddleware,
  socketMiddleware,
} = require("./middlewares");

const helpers = require("./helpers");
const middlewares = require("./middlewares");
const configUploadRoutes = require("./routes/upload");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

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
    helpers: helpers,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  })
);

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middlewares.logMiddleware);



app.set("view engine", "hbs");
app.use(flash());
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error") ?? "";
  res.locals.success_msg = req.flash("success") ?? "";
  next();
});



// config upload routes
configUploadRoutes(csrfProtection, app);


app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.userId = req.session.userId;
  res.locals.projectIDs = req.session.projects ? Object.keys(req.session.projects) : [];
  next();
});

app.use(socketMiddleware(io));
// Routes
app.use("/", require("./routes/home"));
app.use("/", require("./routes/auth"));

app.use(authMiddleware.require_login);
app.use(authMiddleware.injectRole);

// API
app.use("/api/v1/release", require("./routes/api/v1/release"));
app.use("/api/v1/activity", require("./routes/api/v1/activity"));
app.use("/api/v1/module", require("./routes/api/v1/module"));
app.use("/api/v1/project", require("./routes/api/v1/project"));
app.use("/api/v1/testrun", require("./routes/api/v1/testrun"));
app.use("/api/v1/user", require("./routes/api/v1/user"));
app.use("/api/v1/issue", require("./routes/api/v1/issue"));
app.use("/api/v1/testcase", require("./routes/api/v1/testcase"));
app.use("/api/v1/board", require("./routes/api/v1/board"));
app.use("/api/v1/requirement", require("./routes/api/v1/requirement"));
app.use("/api/v1/attachment", require("./routes/api/v1/attachment"));
app.use("/api/v1/member", require("./routes/api/v1/member"));
app.use("/api/v1/user", require("./routes/api/v1/user"));
app.use("/api/v1/notification", require("./routes/api/v1/notification"));

// PAGE
app.use("/dashboard", require("./routes/dashboard"));
app.use("/project", require("./routes/project"));
app.use("/role", require("./routes/api/v1/role"));
app.use("/board", require("./routes/board"));
app.use("/profile", require("./routes/profile"));

app.use(errorHandler.notFoundHandler);
app.use(errorHandler.csrfErrorHandler);
app.use(errorHandler.generalErrorHandler);

// socket.io
// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('joinProject', (projectId) => {
//     socket.join(projectId);
//     console.log(`User joined project ${projectId}`);
//   });


//   socket.on('newNotification', (notification) => {
//     io.to(notification.project_id).emit('notification', notification);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

server.listen(port, () =>
  console.log(`Example app listening on port ${port}! http://localhost:${port}`)
);
