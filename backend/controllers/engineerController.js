const Engineer = require("../models/Engineer");

// Get all engineers
exports.getEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch engineers" });
  }
};

// Get single engineer by ID
exports.getEngineerById = async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.params.id);
    if (!engineer) return res.status(404).json({ error: "Engineer not found" });
    res.json(engineer);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch engineer" });
  }
};

// Create a new engineer
exports.createEngineer = async (req, res) => {
  try {
    const engineer = new Engineer(req.body);
    await engineer.save();
    res.status(201).json(engineer);
  } catch (err) {
    res.status(400).json({ error: "Failed to create engineer" });
  }
};

// Update engineer
exports.updateEngineer = async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!engineer) return res.status(404).json({ error: "Engineer not found" });
    res.json(engineer);
  } catch (err) {
    res.status(400).json({ error: "Failed to update engineer" });
  }
};

// Delete engineer
exports.deleteEngineer = async (req, res) => {
  try {
    const engineer = await Engineer.findByIdAndDelete(req.params.id);
    if (!engineer) return res.status(404).json({ error: "Engineer not found" });
    res.json({ message: "Engineer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete engineer" });
  }
};
