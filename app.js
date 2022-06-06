// handle async errors
require("express-async-errors");
const express = require("express");
const ErrorHandler = require("./src/middlewares/errorHandler");
const NotFound = require("./src/middlewares/notFound");
const connectDb = require("./src/config/db.config");
require("dotenv").config();
const authRoute = require("./src/routes/auth.routes");
const jobsRoute = require("./src/routes/job.routes");
const authMiddleware = require("./src/middlewares/auth.middleware");
// external middlewares
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();
const Port = process.env.PORT || process.env.port;
const v1 = process.env.v1;
const dbUri = process.env.dbUri;

// inbuild middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// external middlewares
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get(`/`, (req, res) => {
  res.send("Welcome to Jobs Api");
});

app.use(`api/v1/auth`, authRoute);
app.use(`${v1}/jobs`, authMiddleware, jobsRoute);

//custom middlewares
app.use(NotFound);
app.use(ErrorHandler);

// start server
const start = async () => {
  await connectDb(dbUri);
  console.log("🚀 Database Connected...");
  app.listen(Port, () => {
    console.log(`🚀 Server running on port: ${Port}`);
  });
};

start();
