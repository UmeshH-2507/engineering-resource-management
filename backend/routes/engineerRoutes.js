const express = require("express");
const router = express.Router();
const {
  getEngineers,
  getEngineerById,
  createEngineer,
  updateEngineer,
  deleteEngineer,
} = require("../controllers/engineerController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getEngineers);
router.get("/:id", auth, getEngineerById);
router.post("/", auth, createEngineer);
router.put("/:id", auth, updateEngineer);
router.delete("/:id", auth, deleteEngineer);

module.exports = router;
