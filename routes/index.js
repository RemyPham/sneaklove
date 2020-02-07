const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

// DISPLAY SNEAKERS IN COLLECTION

router.get("/sneakers/:cat", (req, res, next) => {
  const cat = req.params.cat;
  const query = cat === 'collection' ? {} : { category: cat}
  sneakerModel
    .find(query)
    .then(dbRes => {
      res.render("products", {
        sneaker: dbRes,
        category: req.params.cat // collection/men/women/kids
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
