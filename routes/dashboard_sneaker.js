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


module.exports = router;
