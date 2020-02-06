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


// LOG IN INTO ACCOUNT
router.get("/signin", (req, res) => {
    res.render("signin");
  });
  
    router.post("/signin", (req, res, next) => {
    const user = req.body;
  
  
    if (!user.email || !user.password) {
      return res.render("signin", {
        errorMessage: "Email AND Password REQUIRED!"
      });
    }
  
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (!dbRes) {
          return res.render("signin", {
            errorMessage: "Email/Password Incorrect"
          });
        }
        if (bcrypt.compareSync(user.password, dbRes.password)) {

          const { _doc: clone } = { ...dbRes }; 
          
          delete clone.password; 
          
          req.session.currentUser = clone; 
          return res.redirect("/");
        } else {
          // encrypted password match failed
          return res.render("signin", {
            errorMessage: "Email/Password Incorrect"
          });
        }
      })
      .catch(next);
});




//LOG OUT
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.locals.isLoggedIn = undefined;
      res.redirect("/auth/signin");
    });
  });

module.exports = router;
