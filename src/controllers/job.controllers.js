const Job = require("../models/job.model");
const { StatusCodes } = require("http-status-codes");

exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job,
  });
};

exports.updateJob = (req, res) => {
  res.send("update Job");
};

exports.getAllJobs = async (req, res) => {
  res.send("getAll");
};

exports.getJob = async (req, res) => {
  res.send("getOne");
};

exports.deleteJob = async (req, res) => {
  res.send("delete job");
};
