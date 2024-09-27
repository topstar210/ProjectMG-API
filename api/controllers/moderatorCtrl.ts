import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Moderator from "../models/moderator";
import Image from "../models/image";

// Create Moderator function
export const createModerator = async (req: Request, res: Response) => {
  try {
    const { user_id, profile: profileData } = req.body;

    // Check if moderator already exists
    const existingModerator = await Moderator.findOne({ user_id });
    if (existingModerator) {
      return res.status(400).json({ message: "Moderator already exists" });
    }

    // Create new moderator
    const moderator = new Moderator({
      user_id: user_id,
      profile: {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        gender: profileData.gender,
        age: profileData.age,
        image: profileData.image,
      },
    });
    await moderator.save();

    res.status(201).json(moderator);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update moderator by user_id
export const updateModerator = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { profile: profileData } = req.body;

    // Find the moderator by user_id
    const moderator = await Moderator.findOne({ user_id });
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }

    // Update moderator profile fields
    if (profileData) {
      moderator.profile.first_name =
        profileData.first_name || moderator.profile.first_name;
      moderator.profile.last_name =
        profileData.last_name || moderator.profile.last_name;
      moderator.profile.gender = profileData.gender || moderator.profile.gender;
      moderator.profile.age = profileData.age || moderator.profile.age;
      moderator.profile.image = profileData.image || moderator.profile.image;
    }

    await moderator.save();

    res.status(200).json(moderator);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete moderator by user_id and delete associated image
export const deleteModerator = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the moderator by user_id
    const moderator = await Moderator.findOneAndDelete({ user_id });
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }

    // Delete associated image document if it exists
    if (moderator.profile.image) {
      const image = await Image.findById(moderator.profile.image);
      if (image) {
        // Delete image file from server or storage
        const imagePath = path.join(__dirname, "../../", image.url);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Remove the image file
        }

        // Delete the image document from the database
        await Image.findByIdAndDelete(image._id);
      }
    }

    res
      .status(200)
      .json({ message: "Moderator and associated profile and image deleted" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get moderator by user_id, including image URL
export const getModeratorByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the moderator by user_id
    const moderator = await Moderator.findOne({ user_id }).lean(); // Use lean() for better performance
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }

    // If the profile has an associated image, fetch the image URL
    if (moderator.profile.image) {
      const image = await Image.findById(moderator.profile.image);
      if (image) {
        moderator.profile.image_url = image.url; // Append the image URL to the profile object
      } else {
        moderator.profile.image_url = null; // If no image found
      }
    }

    res.status(200).json(moderator);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
