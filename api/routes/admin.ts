import express from "express";
import {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByUserId,
} from "../controllers/adminCtrl";

const router = express.Router();

// GET route to fetch admin by user_id
router.get("/:user_id", getAdminByUserId);

// POST route to create a new admin
router.post("/create", createAdmin);

// PUT route to update admin by user_id
router.put("/update/:user_id", updateAdmin);

// DELETE route to delete admin by user_id
router.delete("/delete/:user_id", deleteAdmin);

export default router;
