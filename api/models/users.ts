import mongoose, { Schema, Document } from "mongoose";
import { ISettings, SettingsSchema } from "./settings";

export interface IUser extends Document {
  id: string;
  phone_number: string;
  is_active: boolean;
  is_verified: boolean;
  password_hash: string;
  settings: ISettings;
}

const UserSchema: Schema = new Schema({
  phone_number: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_verified: { type: Boolean, default: false },
  password_hash: { type: String, required: true },
  settings: { type: SettingsSchema, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
