import express from "express";
import {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillById,
  getAllSkills,
} from "../controllers/skillCtrl";

const router = express.Router();

router.post("/", createSkill); // Create Skill
router.put("/:id", updateSkill); // Update Skill by ID
router.delete("/:id", deleteSkill); // Delete Skill by ID
router.get("/:id", getSkillById); // Get Skill by ID (with Category)
router.get("/", getAllSkills); // Get all Skills (with Category data)

export default router;
