const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

// DISPLAY SNEAKERS IN COLLECTION

router.get("/sneakers/:cat", (req, res, next) => {
  sneakerModel
    .find() // collection/men/women/kids
    // console.log(req.params.cat)
    .then(dbRes => {
      res.render("products", {
        sneaker: dbRes,
        category: req.params.cat
      });
    })
    .catch(next)
});



router.get("/one-product/:id", (req, res, next) => {
  sneakerModel
  .findById(req.params.id)
  .then(dbRes => {
    res.render("one_product", {sneaker: dbRes})
  })
  .catch(next)
});


module.exports = router;
