const BadRequest = require("./bad-request");
const CustomErrorAPI = require("./custom-error");
const NotFound = require("./notFound");
const Unauthenticated = require("./unauthenticated");

module.exports = {
  NotFound,
  Unauthenticated,
  CustomErrorAPI,
  BadRequest,
};
