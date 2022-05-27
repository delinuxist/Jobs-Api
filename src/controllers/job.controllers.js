exports.createJob = (req, res) => {
  res.send("create job");
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
