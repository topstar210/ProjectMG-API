import mongoose, { Schema, Document } from "mongoose";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface IProfile extends Document {
  first_name: string;
  last_name: string;
  gender: Gender;
  age: number;
  image: mongoose.Schema.Types.ObjectId; // Foreign key to Image
  image_url?: string | null; // Optional field for the resolved image URL
}

export const ProfileSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, enum: Gender, required: true },
  age: { type: Number, required: true },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: false },
});