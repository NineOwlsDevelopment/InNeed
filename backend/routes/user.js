const express = require("express");
const router = new express.Router();
const { getUser, login, register } = require("../controllers/user");

router.get("/", getUser);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
