const express = require("express");
const router = express.Router();
const {
  assignEngineer,
  getAssignments,
  deleteAssignment,
} = require("../controllers/assignmentController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getAssignments);
router.post("/", auth, assignEngineer);
router.delete("/:id", auth, deleteAssignment);

module.exports = router;
