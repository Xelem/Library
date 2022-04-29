const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// START EXPRESS APP
const app = express();

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// BODY PARSER. Reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/books/", bookRouter);
app.use("/api/v1/users/", userRouter);
// app.use("/api/v1/reviews/", reviewRouter);
module.exports = app;
