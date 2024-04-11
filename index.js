const express = require("express");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect")
const app = express();
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter")
const port = 8001;
const path = require("path");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("Connected to MongoDB"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/test", async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls
    })
});

app.use("/url",urlRoute);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use("/",staticRoute);


app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory: {
            timestamp:Date.now()
        },
    }});

    if (!entry) {
        return res.status(404).send("URL not found");
    }
    res.redirect(entry.redirectURL);
})

app.listen(port,()=>console.log("Server Started at port: " + port));