import mongoose from "mongoose";

 type reviewDoc = mongoose.Document & {
  email: string;
  avatar: string;
  content: string;

};


const reviewSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
},{ timestamps: true })


export const Review = mongoose.model<reviewDoc>("Review", reviewSchema);