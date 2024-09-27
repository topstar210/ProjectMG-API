import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  id: string;
  url: string;
  order: number;
  alt: string;
}

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  order: { type: Number, required: false },
  alt: { type: String, required: false },
});

export default mongoose.model<IImage>('Image', ImageSchema);
