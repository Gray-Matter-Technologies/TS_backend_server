
import { generateToken } from '../utils/jwt'
import {User} from '../models/user'


export async function login(_email:string, _password:string) {
  const login = await User.findOne({email:_email}).exec()
  
  
  if(!login){
    return 'fail';
  }
  const res =  await login.validatePassword(_password);
  if(res){
    const token = generateToken(login._id)
    const result = [login._id,token,login.email,login.avatar]
    return (result)
  }else{
 
    return 'fail';
  }
}