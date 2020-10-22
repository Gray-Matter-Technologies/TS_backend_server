
import {AccountType} from '../models/account'
import {Account} from '../models/account';

export async function addAccount(_email:string, _password:string) {
  const account = new Account({email:_email, password:_password});
  await account.hashPassword()
  await account.save();
  console.log(account)
  return account;
}


export async function login(_email:string, _password:string) {
  const login = await Account.findOne({email:_email}).exec()
  
  console.log(_email,_password)
  if(!login){
    return -1;
  }
  const valid = await login.validatePassword(_password);
  console.log(valid)
  if(!valid){
    return "fail";
  }else{
    return "ok";
  }
  
}