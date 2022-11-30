const express = require("express");
const router = new express.Router();
const {
  createJob,
  findJob,
  findJobById,
  updateJob,
  deleteJob,
} = require("../controllers/job");

// access - Private
// endpoint -  /api/job/create
// description - Lets employer create a job posting
router.post("/create", createJob);

// access - Public
// endpoint -  /api/job/find
// description - Lets user find most recent jobs
router.post("/find", findJob);

// access - Public
// endpoint -  /api/job/find
// description - Lets user find specific job
router.get("/find/:uuid", findJobById);

// access - Private
// endpoint -  /api/job/update/:id
// description - Lets employer update specific job
router.put("/update/:id", updateJob);

// access - Private
// endpoint -  /api/job/delete/:id
// description - Lets employer delete specific job
router.delete("/delete/:id", deleteJob);

module.exports = router;
