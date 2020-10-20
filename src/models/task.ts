import mongoose from "mongoose";

enum task_status {
  open,
  assigned,
  completed
}


 type taskDoc = mongoose.Document & {
  price: number;
  avatar:string;
  title: string;
  location: string;
  date: Date;
  status: number
  details: object
};


const taskSchema = new mongoose.Schema({
  budget: Number,
  avatar:String,
  title: String,
  location: String,
  date: Date,
  status: Number,
  details: Object
},{ timestamps: true })


export const Task = mongoose.model<taskDoc>("Task", taskSchema);