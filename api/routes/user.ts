import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  updateSettings,
} from "../controllers/userCtrl";

const router = express.Router();

// User routes
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get('/:id', getUserById);


// Settings routes
router.put("/settings/:userId", updateSettings);

export default router;
