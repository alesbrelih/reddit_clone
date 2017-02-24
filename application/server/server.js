//modueles
const express = require("express");
const bodyparser = require("body-parser");
const modules = require("./models/db.models");
const router = require("./router/router");

const app = express();

// handle json in post
// parse application/json
app.use(bodyparser.json());

//use routing
app.use("/api",router);

app.listen(8000,()=>{
    console.log("express @ 8000");
});
