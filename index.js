const express = require("express");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connect")
const app = express();
const URL = require("./models/url");
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("Connected to MongoDB"));

app.use(express.json());

app.use("/url",urlRoute);

app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory: {
            timestamp:Date.now()
        },
    }});
    res.redirect(entry.redirectURL);
})

app.listen(port,()=>console.log("Server Started at port: " + port));
