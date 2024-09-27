import { Request, Response } from "express";
import Skill from "../models/skill";

// Create Skill
export const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, category_id } = req.body;

    const skill = await Skill.create({ name, category_id });
    res.status(201).json(skill);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Update Skill
export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category_id } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, category_id },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json(skill);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Delete Skill
export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Get Skill (with Category data)
export const getSkillById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id).populate("category_id", "name");
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json(skill);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

// Get all Skills (with Category data)
export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().populate("category_id", "name").lean();
    res.status(200).json(skills);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
