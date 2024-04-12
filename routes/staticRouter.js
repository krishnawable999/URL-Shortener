const express = require("express");
const router = express.Router();
const {restrictTo} = require("../middleware/auth")

const URL = require("../models/url")
// const app = express();

router.get("/signup",async(req,res)=>{
    return res.render("signup");
})

router.get("/login", async(req,res)=>{
    return res.render("login");
})


router.get("/", restrictTo("[NORMAL]"), async(req,res)=>{
    const allurls = await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls : allurls,
    });
})

module.exports = router;