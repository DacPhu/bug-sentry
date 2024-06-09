// middlewares/errorHandlers.js

function notFoundHandler(req, res, next) {
  res.status(404).send({ title: "Page Not Found" });
}

function csrfErrorHandler(err, req, res, next) {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).send({ title: "Form Tampered With" });
  } else {
    next(err);
  }
}

function generalErrorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ title: "Server Error", error: err.message });
}

module.exports = {
  notFoundHandler,
  csrfErrorHandler,
  generalErrorHandler,
};
