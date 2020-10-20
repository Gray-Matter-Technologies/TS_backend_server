import mongoose from "mongoose";
const bcrypt = require('bcrypt');

export type validatePasvalidatePasswordswordFunction = (password:string) => void;


type loginDoc = mongoose.Document & {
  email: string;
  password: string;
  validatePassword : validatePasvalidatePasswordswordFunction;
};



const loginSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  
})



loginSchema.methods.validatePassword = async function(password:string) {
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
}

export const Login = mongoose.model<loginDoc>("Login", loginSchema);