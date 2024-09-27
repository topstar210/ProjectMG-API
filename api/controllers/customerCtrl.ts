import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Customer from "../models/customer";
import Image from "../models/image";

// Create Customer function
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { user_id, profile: profileData } = req.body;

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ user_id });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Create new customer
    const customer = new Customer({
      user_id: user_id,
      profile: {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        gender: profileData.gender,
        age: profileData.age,
        image: profileData.image,
      },
    });
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update customer by user_id
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const { profile: profileData } = req.body;

    // Find the customer by user_id
    const customer = await Customer.findOne({ user_id });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update customer profile fields
    if (profileData) {
      customer.profile.first_name =
        profileData.first_name || customer.profile.first_name;
      customer.profile.last_name =
        profileData.last_name || customer.profile.last_name;
      customer.profile.gender = profileData.gender || customer.profile.gender;
      customer.profile.age = profileData.age || customer.profile.age;
      customer.profile.image = profileData.image || customer.profile.image;
    }

    await customer.save();

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete customer by user_id and delete associated image
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the customer by user_id
    const customer = await Customer.findOneAndDelete({ user_id });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete associated image document if it exists
    if (customer.profile.image) {
      const image = await Image.findById(customer.profile.image);
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
      .json({ message: "Customer and associated profile and image deleted" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get customer by user_id, including image URL
export const getCustomerByUserId = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    // Find the customer by user_id
    const customer = await Customer.findOne({ user_id }).lean(); // Use lean() for better performance
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // If the profile has an associated image, fetch the image URL
    if (customer.profile.image) {
      const image = await Image.findById(customer.profile.image);
      if (image) {
        customer.profile.image_url = image.url; // Append the image URL to the profile object
      } else {
        customer.profile.image_url = null; // If no image found
      }
    }

    res.status(200).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
