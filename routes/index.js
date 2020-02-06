const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res) => {
  sneakerModel
    .find()
    .then(dbRes => {
      res.render("products", {
        products: dbRes
      });
    })
    .catch(dbErr => dbErr)
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});


module.exports = router;
