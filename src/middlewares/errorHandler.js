const { StatusCodes } = require("http-status-codes");
// const { CustomErrorAPI } = require("../errors");

const ErrorHandler = (err, req, res, next) => {
  console.log(err.errors);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  // if (err instanceof CustomErrorAPI) {
  //   return res.status(err.statusCode).json({
  //     status: "error",
  //     message: err.message,
  //   });
  // }

  // Validation error checker
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Duplicate email error checker
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another email `;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Cast error checker
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customError.statusCode).json({
    status: "error",
    message: customError.msg,
  });
};

module.exports = ErrorHandler;
