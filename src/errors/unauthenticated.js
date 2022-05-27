const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-error");

class Unauthenticated extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
