const mongoose = require("mongoose");

const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  skills: [String],
  availableHours: { type: Number, default: 40 }, // weekly hours
  role: { type: String, default: "engineer" },
});

module.exports = mongoose.model("Engineer", engineerSchema);
