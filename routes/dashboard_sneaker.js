const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploadCloud = require('../config/cloudinary');
const sneakerModel = require('../models/Sneaker')

router.get("/prod-add", (req,res) =>{
    res.render("products_add");
})

router.post("/prod-add", uploadCloud.single('photo'), (req,res,next) =>{
    const {name, ref, sizes, description, price, category, id_tags} = req.body;
    const imgPath = req.file;
    const newSneaker = new sneakerModel({name, ref, sizes, description, price, category, id_tags, imgPath});

    newSneaker
    .save()
    .then(sneaker => {
        res.redirect('/') //change to manage later
    })
    .catch(next);
})

module.exports = router;
