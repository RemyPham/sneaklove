const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");


// views form signin/signup
router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});


// CREATE ACCOUNT SIGNUP




module.exports = router;
