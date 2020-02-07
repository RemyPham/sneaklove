const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag")

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//DISPLAY SNEAKERS IN COLLECTION
router.get("/sneakers/collection", (req, res, next) => {
  Promise.all([
    sneakerModel.find(),
    tagModel.find()
  ])
    .then(dbRes => {
      res.render("products", {
        sneakers: dbRes[0],
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
