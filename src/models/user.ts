import mongoose from "mongoose";;
const bcrypt = require('bcrypt');

type hashPasswordFunction = () => void;
type validatePasvalidatePasswordswordFunction = (password:string) => string;


 type UserDoc = mongoose.Document & {
  email:string
  password:string
  backgroundImg: string
  phoneNumber:string
  avatar: string
  firstName:string
  lastName: string
  location: string
  about: string
  skills: string[]
  reviews: string
  overviews:string
  

  hashPassword:hashPasswordFunction;
  validatePassword : validatePasvalidatePasswordswordFunction;
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
  overviews:String,


},{ timestamps: true })

UserSchema.methods.hashPassword= async function() {
  this.password = await bcrypt.hash(this.password, 5);
}

UserSchema.methods.validatePassword = async function(password:string) {
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
}







export const User = mongoose.model<UserDoc>("User", UserSchema);