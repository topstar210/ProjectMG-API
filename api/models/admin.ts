import mongoose, { Schema, Document } from "mongoose";
import { IProfile, ProfileSchema } from "./profile";

export interface IAdmin extends Document {
  user_id: string;
  profile: IProfile;
}

const AdminSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  profile: { type: ProfileSchema, required: true },
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
