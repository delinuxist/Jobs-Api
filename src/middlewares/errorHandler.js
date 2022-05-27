const { StatusCodes } = require("http-status-codes");
const { CustomErrorAPI } = require("../errors");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: err.message,
  });
};

module.exports = ErrorHandler;
