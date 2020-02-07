const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploadCloud = require('../config/cloudinary');
const sneakerModel = require('../models/Sneaker');


router.get("/prod-add", (req,res) =>{
    res.render("products_add", {
        scripts: ["client"]
    });
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



// DISPLAY SNEAKERS
router.get("/prod-manage", (req,res,next) => {
    sneakerModel
    .find()
    .then(result => {
        res.render("products_manage", {
            sneakers: result
        });
    })
    .catch(next)
})



//EDIT SNEAKER
router.get("/prod-edit/:id", (req, res, next) => {
    sneakerModel
    .findById(req.params.id)
    .then(dbRes => {
        res.render("product_edit", { sneaker: dbRes });
    })
    .catch(next);
});

router.post("/prod-edit/:id", (req, res, next) => {
    const {name, ref, sizes, description, price, category, id_tags} = req.body;
  
    sneakerModel
    .findByIdAndUpdate(req.params.id, {name, ref, sizes, description, price, category, id_tags})
    .then(dbRes => {
        //MESSAGE TO PUT HERE
        res.redirect("/sec/prod-manage")
    })
    .catch(next);
});


// DELETE SNEAKER
router.get("/prod-delete/:id", (req, res, next) => {
    sneakerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
        //ADD MSG HERE
        res.redirect("/sec/prod-manage")
    })
    .catch(next);
});


// AXIOS ADD TAG (check client.js)
const tagModel = require('../models/Tag');

router.post("/axios-post", (req,res) => {

    const tag = req.body;
    tagModel
    .create(tag)
    .then(dbSuccess => dbSuccess)
    .catch(dbErr => dbErr)
    // const labels = req.body.labels
    //create your label
})

router.get("/prod-add", (req,res,next) => {
    tagModel
    .find()
    .then(result => {
        res.render("products_add",{
            tags : result
        })
    })
    .catch(next)
})



module.exports = router;
