const Assignment = require("../models/Assignment");
const Engineer = require("../models/Engineer");

// Helper: Get engineer's current allocated hours
const getAllocatedHours = async (engineerId) => {
  const assignments = await Assignment.find({ engineer: engineerId });
  return assignments.reduce((sum, a) => sum + a.hoursPerWeek, 0);
};

// Create new assignment
exports.assignEngineer = async (req, res) => {
  try {
    const { engineer, project, hoursPerWeek, startDate, endDate } = req.body;

    const engineerData = await Engineer.findById(engineer);
    if (!engineerData) return res.status(404).json({ error: "Engineer not found" });

    const totalAllocated = await getAllocatedHours(engineer);
    if (totalAllocated + hoursPerWeek > engineerData.availableHours) {
      return res.status(400).json({ error: "Engineer capacity exceeded" });
    }

    const assignment = new Assignment({ engineer, project, hoursPerWeek, startDate, endDate });
    await assignment.save();

    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: "Failed to create assignment" });
  }
};

// Get all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("engineer")
      .populate("project");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};
