const Job = require("../models/job.model");
const { StatusCodes } = require("http-status-codes");
const NotFound = require("../errors/notFound");

exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    job,
  });
};

exports.updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { name, position },
  } = req;

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { name, position },
    { new: true }
  );

  if (!job) {
    throw new NotFound(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    status: "updated",
    job,
  });
};

exports.getAllJobs = async (req, res) => {
  const createdBy = req.user.userId;
  const jobs = await Job.find({ createdBy }).sort("createdAt");

  res.status(StatusCodes.OK).json({
    count: jobs.length,
    jobs,
  });
};

exports.getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFound(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    job,
  });
};

exports.deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFound(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({
    status: "deleted",
  });
};
