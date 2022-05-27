const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/job.controllers");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", getAllJobs);

router.get("/:id", getJob);

router.post("/", createJob);

router.patch("/:id", updateJob);

router.delete("/:id", deleteJob);

module.exports = router;
