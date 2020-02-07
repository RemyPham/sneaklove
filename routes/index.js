const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag")

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

// DISPLAY SNEAKERS IN COLLECTION

router.get("/sneakers/:cat", (req, res, next) => {
  const cat = req.params.cat;
  const query = cat === 'collection' ? {} : { category: cat}
  Promise.all([
    sneakerModel.find(query),
    tagModel.find()
  ])
    .then(dbRes => {
      res.render("products", {
        sneaker: dbRes[0],
        category: cat, // collection/men/women/kids
        tags: dbRes[1] 
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
