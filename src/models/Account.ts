import mongoose from "mongoose";
const bcrypt = require('bcrypt');

export enum AccountType{
  admin,
  client,
  tasker,
}

type hashPasswordFunction = () => void;
type validatePasvalidatePasswordswordFunction = (password:string) => string;


 export type AccountDoc = mongoose.Document & {
  lastName: string;
  firstName:string
  email: string;
  password: string;
  
  phoneNumber: string;
  hashPassword:hashPasswordFunction;
  validatePassword : validatePasvalidatePasswordswordFunction;
};


const AccountSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  lastName: String,
  firstName:String,
  password: String,
  phoneNumber: String,

},{ timestamps: true })


AccountSchema.methods.hashPassword= async function() {
  this.password = await bcrypt.hash(this.password, 5);
}

AccountSchema.methods.validatePassword = async function(password:string) {
  const validatePassword = await bcrypt.compare(password, this.password);
  return validatePassword;
}


export const Account = mongoose.model<AccountDoc>("Account", AccountSchema);