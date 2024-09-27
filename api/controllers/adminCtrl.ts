import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Admin from "../models/admin";
import Image from "../models/image";

// Create Admin function
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { user_id, profile: profileData } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ user_id });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const admin = new Admin({
      user_id: user_id,
      profile: {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        gender: profileData.gender,
        age: profileData.age,
        image: profileData.image,
      },
    });
    await admin.save();

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update admin by user_id
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { profile: profileData } = req.body;

    // Find the admin by user_id
    const admin = await Admin.findOne({ user_id });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update admin profile fields
    if (profileData) {
      admin.profile.first_name =
        profileData.first_name || admin.profile.first_name;
      admin.profile.last_name =
        profileData.last_name || admin.profile.last_name;
      admin.profile.gender = profileData.gender || admin.profile.gender;
      admin.profile.age = profileData.age || admin.profile.age;
      admin.profile.image = profileData.image || admin.profile.image;
    }

    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete admin by user_id and delete associated image
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the admin by user_id
    const admin = await Admin.findOneAndDelete({ user_id });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete associated image document if it exists
    if (admin.profile.image) {
      const image = await Image.findById(admin.profile.image);
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
      .json({ message: "Admin and associated profile and image deleted" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get admin by user_id, including image URL
export const getAdminByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the admin by user_id
    const admin = await Admin.findOne({ user_id }).lean(); // Use lean() for better performance
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // If the profile has an associated image, fetch the image URL
    if (admin.profile.image) {
      const image = await Image.findById(admin.profile.image);
      if (image) {
        admin.profile.image_url = image.url; // Append the image URL to the profile object
      } else {
        admin.profile.image_url = null; // If no image found
      }
    }

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
