import { Request, Response } from "express";
import Image from "../models/image";
import multer from "multer";
import path from "path";

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Set up multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
}).single("image"); // Single file upload

// Image upload and save handler
export const uploadImage = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create a new Image document with the file data
      const image = new Image({
        url: req.file.path, // Path of the saved file
        order: req.body.order,
        alt: req.body.alt,
      });

      await image.save();
      res.status(201).json(image);
    } catch (error) {
      res
        .status(500)
        .json({
          message: error instanceof Error ? error.message : "Unknown error",
        });
    }
  });
};
