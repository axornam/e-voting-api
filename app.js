require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// setup cors headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Setup MondoDB Database Server
mongoose.connect(process.env.DB_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error")
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// configure express server
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
