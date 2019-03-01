// attendanceFileParser.js
/*

The purpose of this module is to parse a DDE file from PowerSchool which contains
the following export field list with Attendance (157) as the current table:

  [1]Student_number
  [1]ExitDate
  [1]EntryDate
  [156]Att_Code
  [156]Description
  [156]Presence_Status_CD
  Att_Date
  [138]Name
  [4]TeacherID
  Att_Mode_Code

*/
const fs = require("fs");
let attendanceDataFileStream = fs.createReadStream("./public/data.txt");


// Setup the basic objects
let headers;
let attendanceData = {};
let chunkData = "";



let getAttendanceData = new Promise(function(resolve, reject){
  // read the file
  attendanceDataFileStream
    .on("error", function(err){
      reject(err);
    })
    .on("data", chunk => {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Done reading file in attendanceFileParser.js");

      // parse the file by converting Buffer to String
      // then split by line breaks
      let dataLines = chunkData.toString().split("\r\n");

      if (dataLines) {
        dataLines.forEach(function(line) {

          // Convert each row into an Array
          let values = line.split("\t");

          // Extract the headers
          if (line.includes("Student_number")) {
            headers = values;
          } else {

            // Assign field to corresponding key
            // Use headers as keys
            values.forEach(function(el, idx) {
              if (!attendanceData.hasOwnProperty(headers[idx])) {
                attendanceData[headers[idx]] = [el];
              } else {
                attendanceData[headers[idx]].push(el);
              }
            });
          }
        });
      }

      // Send the attendanceData object back
      resolve(attendanceData);
    });
})


/*
function getAttendanceData(dataFileStream, cb) {

  // read the file
  dataFileStream
    .on("error", function(err){
      console.error(err);
    })
    .on("data", chunk => {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Done reading file in attendanceFileParser.js");

      // parse the file by converting Buffer to String
      // then split by line breaks
      let dataLines = chunkData.toString().split("\r\n");

      if (dataLines) {
        dataLines.forEach(function(line) {

          // Convert each row into an Array
          let values = line.split("\t");

          // Extract the headers
          if (line.includes("Student_number")) {
            headers = values;
          } else {

            // Assign field to corresponding key
            // Use headers as keys
            values.forEach(function(el, idx) {
              if (!attendanceData.hasOwnProperty(idx)) {
                attendanceData[headers[idx]] = [el];
              } else {
                attendanceData[headers[idx]].push(el);
              }
            });
          }
        });
      }

      // Send the attendanceData object back
      cb(attendanceData);
    });
}
*/

module.exports = getAttendanceData;
