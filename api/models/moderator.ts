import mongoose, { Schema, Document } from "mongoose";
import { IProfile, ProfileSchema } from "./profile";

export interface IModerator extends Document {
  user_id: string;
  profile: IProfile;
}

const ModeratorSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  profile: { type: ProfileSchema, required: true },
});

export default mongoose.model<IModerator>("Moderator", ModeratorSchema);
