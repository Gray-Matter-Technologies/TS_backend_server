import mongoose from "mongoose";

enum task_status {
  open,
  assigned,
  completed
}


 type taskDoc = mongoose.Document & {
  email: string
  name: string
  budget: number;
  avatar:string;
  title: string;
  location: string;
  date: Date;
  status: number
  details: object
  questions: object[],
  offers: object[]
  assignedTo: string
};


const taskSchema = new mongoose.Schema({
  email: {type:String, ref:'User'},
  name: String,
  budget: Number,
  avatar:String,
  title: String,
  location: String,
  date: Date,
  status: Number,
  details: String,
  questions: Array,
  offers: Array,
  assignedTo:{type:String, ref:'User'}
},{ timestamps: true })


export const Task = mongoose.model<taskDoc>("Task", taskSchema);