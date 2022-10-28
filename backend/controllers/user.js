const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const sanitize = require("mongo-sanitize");
const { v4: uuidv4 } = require("uuid");

exports.login = async (req, res) => {
  try {
    let { email, password } = sanitize(req.body);

    let user = await User.findOne({ email });

    let isValidPw = await bcrypt.compare(password.toString(), user.password);

    if (!isValidPw) {
      return res
        .status(400)
        .send({ error: "Invalid email/password combination." });
    }

    res.send({ data: "Logged in" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ error: e.message });
  }
};

exports.register = async (req, res) => {
  try {
    let { email, password, confirmPassword, firstName, lastName } = sanitize(
      req.body
    );

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send({ error: "An account with that email already exist." });
    }

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return res.status(400).send({ error: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "A valid email is required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Both passwords must match." });
    }

    let hashedPW = await bcrypt.hash(password.toString(), 8);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPW,
      createdAt: Date.now(),
      uuid: uuidv4(),
    });

    await user.save();

    res.send(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ error: e.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    res.send({ data: "Logged out" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ error: e.message });
  }
};
