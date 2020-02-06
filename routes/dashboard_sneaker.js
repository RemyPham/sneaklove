const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploadCloud = require('../config/cloudinary');
const sneakerModel = require('../models/Sneaker');
const tagModel = require('../models/Tag');

router.get("/prod-add", (req,res) =>{
    res.render("products_add");
})

router.post("/prod-add", uploadCloud.single('photo'), (req,res,next) =>{
    const {name, ref, sizes, description, price, category, id_tags} = req.body;
    const imgPath = req.file.url;
    const newSneaker = new sneakerModel({name, ref, sizes, description, price, category, id_tags, imgPath});

    newSneaker
    .save()
    .then(sneaker => {
        res.redirect('/') //change to manage later
    })
    .catch(next);
})

// **** ADD TAG ROUTE FOR AJAX ****

// router.post("/prod-add", (req, res, next) => {
//     const {label} = req.body;
//     tagModel
//     .create()
//     .then(() => res.redirect("/sec/prod-add"))
//     .catch(next);
// })

module.exports = router;
