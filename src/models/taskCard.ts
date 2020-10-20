import mongoose from "mongoose";



 type taskCardDoc = mongoose.Document & {
  price: number;
  avatar:number;
  title: string;
  location: string;
  date: Date;
  status: number;
  details: string;
 
};


const taskCardSchema = new mongoose.Schema({
  budget: Number,
  avatar:String,
  title: String,
  location: String,
  date: Date,
  status: Number,
  details: String,
  images: Array,
  questions: Array,
},{ timestamps: true })


export const TaskCard = mongoose.model<taskCardDoc>("TaskCard", taskCardSchema);