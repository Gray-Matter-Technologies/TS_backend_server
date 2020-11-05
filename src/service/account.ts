

import {User} from '../models/user';
const DEFULT_AVATAR = '/avatar/defaultAvatar.jpg'

export async function addAccount(_email:string, _password:string) {
  const existUser = await User.findOne({email:_email}).exec()
  if(!existUser){
  const account = new User({email:_email, password:_password, avatar:DEFULT_AVATAR});
  await account.hashPassword()
  await account.save()
  return account;
  }
  else{
    return 'conflict';
  }
  
  
}


export async function login(_email:string, _password:string) {
  const login = await User.findOne({email:_email}).exec()
  
  
  if(!login){
    return -1;
  }
  const valid = await login.validatePassword(_password);
  console.log(valid)
  if(!valid){
    return "fail";
  }else{
    return login
  }
  
}