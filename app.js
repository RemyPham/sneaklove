console.log("node says : waxOn/waxOff !");

require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/helpers-hbs"); // utils for hbs templates


// base dependencies
const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const path = require("path");


// initial config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());



// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in... 
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))
function checkloginStatus(req, res, next) {
  res.locals.currentUser = req.session.currentUser ? req.session.currentUser : null; 
  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}

//PROTECT ROUTE : MUST BE LOGGED IN
//Middleware to call in GET
 module.exports = function protectRoute(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/auth/signin");
}



function eraseSessionMessage() {
  var count = 0; // initialize counter in parent scope and use it in inner function
  return function(req, res, next) {
    if (req.session.msg) { // only increment if session contains msg
      if (count) { // if count greater than 0
        count = 0; // reset counter
        req.session.msg = null; // reset message
      }
      ++count; // increment counter
    }
    next(); // continue to the requested route
  };
}

app.use(checkloginStatus);
app.use(eraseSessionMessage());


// Getting/Using router(s)
const basePageRouter = require("./routes");
app.use("/", basePageRouter);
app.use("/auth", require("./routes/auth"));
app.use("/sec", require("./routes/dashboard_sneaker"))



module.exports = app;