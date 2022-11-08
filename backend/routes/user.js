const express = require("express");
const router = new express.Router();
const { getUser, login, register } = require("../controllers/user");

// access - Public
// endpoint -  /api/user/:id
router.get("/:id", getUser);

// access - Public
// endpoint -  /api/user/login
router.post("/login", login);

// access - Public
// endpoint -  /api/user/register
router.post("/register", register);

module.exports = router;
