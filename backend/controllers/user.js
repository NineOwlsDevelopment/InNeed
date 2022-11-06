const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const { v4: uuidv4 } = require("uuid");

exports.login = async (req, res) => {
  try {
    let { email, password } = sanitize(req.body);

    if (!email || !password) {
      return res.status(400).send({ error: "All fields are required." });
    }

    let user = await User.findOne(
      { email },
      "-_id -createdAt -updatedAt -__v "
    );

    if (!user) {
      return res
        .status(400)
        .send({ error: "Invalid email/password combination." });
    }

    let isValidPw = await bcrypt.compare(password.toString(), user.password);

    if (!isValidPw) {
      return res
        .status(400)
        .send({ error: "Invalid email/password combination." });
    }

    jwt.sign(
      { id: user.uuid },
      process.env.jwtsecret,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          return res.status(400).send({ error: "InvalidCredentials" });
        }

        res.cookie(process.env.TOKEN_PSUEDO_NAME, token, {
          secure: process.env.NODE_ENV !== "development",
        });

        user = {
          isAuth: true,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          uuid: user.uuid,
        };

        return res.status(200).send({
          user,
        });
      }
    );
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

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send({ error: "An account with that email already exist." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "A valid email is required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Both passwords must match." });
    }

    let hashedPW = await bcrypt.hash(password.toString(), 8);

    let user = new User({
      firstName,
      lastName,
      email,
      password: hashedPW,
      createdAt: Date.now(),
      uuid: uuidv4(),
    });

    await user.save();

    jwt.sign(
      { id: user.uuid },
      process.env.jwtsecret,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          return res.status(400).send({ error: "InvalidCredentials" });
        }

        res.cookie(process.env.TOKEN_PSUEDO_NAME, token, {
          secure: process.env.NODE_ENV !== "development",
        });

        user = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          uuid: user.uuid,
        };

        return res.status(200).send({
          user,
        });
      }
    );
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
