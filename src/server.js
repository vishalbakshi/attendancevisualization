const express = require("express");
const dotenv = require("dotenv");
const calculateADA = require("./calculateADA.js");
const getAttendanceData = require("./attendanceFileParser.js");
const getCalendarDayData = require("./calendarDayFileParser.js");


// Send the promises to caclulateADA
calculateADA(getAttendanceData, getCalendarDayData);

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
