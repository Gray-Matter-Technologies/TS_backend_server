import mongoose from "mongoose";

 type UserDoc = mongoose.Document & {
  email:string
  password:string
  backgroundImg: string,
  phoneNumber:string
  avatar: string;
  firstName:string
  lastName: string;
  location: string;
  about: string;
  skills: string[],
  reviews: string,
  overviews:string
};


const UserSchema = new mongoose.Schema({
  email:String,
  password:String,
  phoneNumber:String,
  backgroundImg:String,
  avatar:String,
  lastName: String,
  firstName:String,
  location:String,
  about: String,
  skills: Array,
  reviews: String,
  overviews:String

},{ timestamps: true })


export const User = mongoose.model<UserDoc>("User", UserSchema);