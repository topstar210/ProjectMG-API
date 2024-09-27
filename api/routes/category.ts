import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
} from "../controllers/categoryCtrl";

const router = express.Router();

router.post("/", createCategory); // Create Category
router.put("/:id", updateCategory); // Update Category by ID
router.delete("/:id", deleteCategory); // Delete Category by ID
router.get("/:id", getCategoryById); // Get Category by ID
router.get("/", getAllCategories); // Get all Categories

export default router;
