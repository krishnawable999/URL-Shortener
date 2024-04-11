const express = require("express");
const router = express.Router();
const URL = require("../models/url")
// const app = express();

router.get("/signup",async(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})


router.get("/", async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home",{
        urls : allurls,
    });
})


module.exports = router;