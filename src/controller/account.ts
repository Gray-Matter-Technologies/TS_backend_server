import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import { generateToken } from '../utils/jwt'
import {addAccount} from '../service/account';
import {createInfoTemplate} from '../service/user'
const loginCheck = (req: Request, res: Response, next: NextFunction) =>{
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    next();
  }else{
    res.send("please login")
  }
}

@Controller('/user')
class DataController {
  @PostMapping('/signUp')
  async addAccount(req: Request, res: Response){
    const { email,password } = req.body;
    const user =await addAccount(email,password);
    const token = generateToken(user._id)
    return res.json({user, token});
  }
  
  


}