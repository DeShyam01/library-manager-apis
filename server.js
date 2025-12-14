const express = require("express");
const bookRouter = require("./src/routes/bookRouter");
const issueBookRouter = require("./src/routes/issueBookRouter");
const userRouter = require("./src/routes/userRouter");
const db = require("./src/config/db");
const {limiter, securityHeaders} = require("./src/middleware/security");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(limiter);
app.use(securityHeaders);

const PORT = process.env.PORT || 3000;

const requestLoggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/issue-book", issueBookRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port: 3000");
});
