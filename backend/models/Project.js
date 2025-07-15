const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  requiredSkills: [String],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  assignedEngineers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Engineer" }]
});

module.exports = mongoose.model("Project", projectSchema);
