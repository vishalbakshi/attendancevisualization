const express = require("express");
const dotenv = require("dotenv");
const calculateADA = require("./calculateADA.js");
const getAttendanceData = require("./attendanceFileParser.js");
const getCalendarDayData = require("./calendarDayFileParser.js");
const fs = require("fs");

// prepare readStream for data file
let attendanceDataFileStream = fs.createReadStream("./public/data.txt");
let calendarDayDataFileStream = fs.createReadStream(
  "./public/calendar_day.txt"
);

getCalendarDayData(calendarDayDataFileStream);
getAttendanceData(attendanceDataFileStream, calculateADA);

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
