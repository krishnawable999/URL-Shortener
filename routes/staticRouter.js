const express = require("express");
const router = express.Router();
// const app = express();

router.get("/",(req,res)=>{
    return res.render("home");
})


module.exports = router;