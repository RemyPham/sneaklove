const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/prod-add", (req,res) =>{
    res.render("products_add");
})


module.exports = router;
