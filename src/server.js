const express = require("express");
const dotenv = require("dotenv");

// Setup the basic objects
dotenv.config();
const app = express();
app.set("view engine", "pug");
app.use(express.static("public"));

app.route("/").get(function(req, res) {
  res.render("index");
});

const server = app.listen(8080, function() {
  console.log("express listening on 8080");
});
