import mongoose, { Schema, Document } from 'mongoose';
import { IProfile } from './profile';

export interface ISpecialist extends Document {
  user_id: string;
  profile: IProfile;
  skills: string[];
}

const SpecialistSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  skills: { type: [String], required: true },
});

export default mongoose.model<ISpecialist>('Specialist', SpecialistSchema);
