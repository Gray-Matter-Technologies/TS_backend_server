
import {Login} from '../models/login'
import {Account} from '../models/Account'
export async function login(_email:string, _password:string) {
  const login = await Login.findOne({email:_email,password:_password}).exec()
  
  console.log(_email,_password)
  if(!login){
    return -1;
  }
  await login.validatePassword(_password);
 
}