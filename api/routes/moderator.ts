import express from "express";
import {
  createModerator,
  updateModerator,
  deleteModerator,
  getModeratorByUserId,
} from "../controllers/moderatorCtrl";

const router = express.Router();

// GET route to fetch Moderator by user_id
router.get("/:user_id", getModeratorByUserId);

// POST route to create a new Moderator
router.post("/create", createModerator);

// PUT route to update Moderator by user_id
router.put("/update/:user_id", updateModerator);

// DELETE route to delete Moderator by user_id
router.delete("/delete/:user_id", deleteModerator);

export default router;
