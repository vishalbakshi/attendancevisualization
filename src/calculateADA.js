// Carry Fwd: enrollment count of students that were carried over from the
// previous month

// Gain: number of students who newly enrolled during time period
// Loss: '' dropped
// Ending: enrollment count present on final day of the reporting period

// Actual Days: the number of days in attendance
// (Carry Fwd + Gain) * School Days

// Days N/E: Number of days student was not enrolled in reporting period

// Days Absent: the number of days student was absent during reporting period

// Days Attd: days a student is present during reporting period
// Actual Days - (Off Track + Inelegible Days + Days N/E + Days Absent)

// ADA: Days attended divided by number of instructional days in the
// reporting period

// ADA%: Days Attd / (Actual Days - Off Track - Days N/E - Days Ineligible)

const calculateADA = function(attendanceData) {
  console.log(Object.keys(attendanceData));
};

module.exports = calculateADA;
