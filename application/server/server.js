//modueles
const express = require("express");
const bodyparser = require("body-parser");
const models = require("./models/db.models");
const router = require("./router/router");
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const auth = require("./auth/server.auth");

const app = express();

//cross origin requests
app.use(cors());

// handle json in post
// parse application/json
app.use(bodyparser.json());

//use authentication
app.use(auth.initialize());

//use routing
app.use("/api/v1",router);

//static
app.use(express.static(path.join(__dirname+"/public")));

//views
app.use("views",express.static(path.join(__dirname,"/public")));
app.get("/",(req,res) => {
	res.sendFile("index.html");
});
app.engine("html", ejs.renderFile);

app.listen(8008,()=>{
	console.log("express @ 8008");
});
