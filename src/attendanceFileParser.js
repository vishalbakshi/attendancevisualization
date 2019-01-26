// Setup the basic objects
let headers;
let attendanceData = {};
let chunkData = "";

function getAttendanceData(dataFileStream, cb) {
  // read the file
  dataFileStream
    .on("data", chunk => {
      chunkData += chunk;
    })
    .on("end", function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("Done reading file in attendanceFileParser.js");
      let dataLines = chunkData.toString().split("\r\n");
      if (dataLines) {
        dataLines.forEach(function(line) {
          let values = line.split("\t");
          if (line.includes("Student_number")) {
            headers = values;
          } else {
            values.forEach(function(el, idx) {
              if (!attendanceData.hasOwnProperty(idx)) {
                attendanceData[idx] = [el];
              } else {
                attendanceData[idx].push(el);
              }
            });
          }
        });
      }

      cb(attendanceData);
    });
}

module.exports = getAttendanceData;
