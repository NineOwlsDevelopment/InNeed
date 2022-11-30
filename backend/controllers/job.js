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
      title: title.toLowerCase(),
      company: company.toLowerCase(),
      city: city.toLowerCase(),
      state: state.toLowerCase(),
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

    return res.status(200).send({ message: job });
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
    let { profession, location } = sanitize(req.body);

    if (!profession && !location) {
      return res
        .status(404)
        .send({ error: "Enter a job title or location to start a search" });
    }

    location = location.toLowerCase();
    let city = location.split(",")[0];
    let state = location.split(",")[1];
    let jobs;

    if (city && profession) {
      jobs = await Job.find()
        .or([{ city }, { state }, { city: state }, { state: city }])
        .and({ title: { $regex: profession.toLowerCase(), $options: "i" } });
    } else {
      jobs = await Job.find()
        .or([{ city }, { state }, { city: state }, { state: city }])
        .or({ title: { $regex: profession.toLowerCase(), $options: "i" } });
    }

    return res.status(200).send({ message: jobs });
  } catch (e) {
    console.log(e.message);
    return res.status(404).send({ error: e.message });
  }
};

// access - Public
// endpoint -  /api/job/find
// description - Lets user find specific job
exports.findJobById = async (req, res) => {
  try {
    const { uuid } = sanitize(req.params);
    const job = await Job.findOne({ uuid });

    if (!job) {
      return res
        .status(404)
        .send({ error: "No job with that uuid could be found." });
    }

    return res.status(200).send({ message: job });
  } catch (e) {
    console.log(e);
    return res.status(404).send({ error: e.message });
  }
};

// access - Private
// endpoint -  /api/job/update/:id
// description - Lets employer update specific job
exports.updateJob = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};

// access - Private
// endpoint -  /api/job/delete/:id
// description - Lets employer delete specific job
exports.deleteJob = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(400).send({ error: e.message });
  }
};
