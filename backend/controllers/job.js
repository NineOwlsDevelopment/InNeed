const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const { v4: uuidv4 } = require("uuid");
const Job = require("../models/Job");

// access - Private
// endpoint -  /api/job/create
// description - Lets employer create a job posting
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      city,
      state,
      salaryLow,
      salaryHigh,
      jobType,
      description,
      skills,
      education,
      experience,
    } = sanitize(req.body);

    const job = new Job({
      title,
      company,
      city,
      state,
      salaryLow,
      salaryHigh,
      jobType,
      description,
      skills,
      education,
      experience,
      createdAt: Date.now(),
      uuid: uuidv4(),
    });

    await job.save();

    return res.status(200).send({ job });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

// access - Public
// endpoint -  /api/job/find
// description - Lets user find most recent jobs
exports.findJob = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

// access - Public
// endpoint -  /api/job/find
// description - Lets user find specific job
exports.findJobById = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

// access - Private
// endpoint -  /api/job/update/:id
// description - Lets employer update specific job
exports.updateJob = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

// access - Private
// endpoint -  /api/job/delete/:id
// description - Lets employer delete specific job
exports.deleteJob = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};
