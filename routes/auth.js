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
router.post("/signup", (req, res, next) => {
    const user = req.body; 
    console.log(user);
    if (!user.email || !user.password) {
      return res.render("signup", {
          errorMessage: "Email AND Password REQUIRED!"
      });
    } else {
      userModel
        .findOne({ email: user.email })
        .then(dbRes => {
          if (dbRes) {
            return res.render("signup", {
                errorMessage: "Email already used!"
            }); 
          }
  
          const salt = bcrypt.genSaltSync(10);
          const hashed = bcrypt.hashSync(user.password, salt);

          user.password = hashed; 
      
          userModel
          .create(user)
          .then(() => res.redirect("/auth/signin"));
        })
        .catch(next);
    }
  });



module.exports = router;
