import mongoose, { Schema, Document } from "mongoose";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export enum Language {
  EN = "en",
  FR = "fr",
}

export interface ISettings extends Document {
  theme: Theme;
  language: Language;
  notifications: boolean;
}

export const SettingsSchema: Schema = new Schema({
  theme: { type: String, enum: Theme },
  language: { type: String, enum: Language },
  notifications: { type: Boolean },
});