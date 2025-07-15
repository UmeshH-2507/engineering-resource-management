const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineer",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  hoursPerWeek: {
    type: Number,
    required: true,
    min: 1,
    max: 40,
  },
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Assignment", assignmentSchema);
