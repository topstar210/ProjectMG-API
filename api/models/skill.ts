import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  category_id: string; // Foreign key to category
  name: string;
}

const SkillSchema: Schema = new Schema({
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
  name: { type: String, required: true },
});

export default mongoose.model<ISkill>('Skill', SkillSchema);