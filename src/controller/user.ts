import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, Use,  GetMapping, PostMapping,PutMapping} from '../decorator';
import {editUserInfo, showUserInfo} from '../service/user';
const loginCheck = (req: Request, res: Response, next: NextFunction) =>{
  const isLogin = req.session ? req.session.login : false;
  if(isLogin) {
    next();
  }else{
    res.send("please login")
  }
}

@Controller('/user')
class UserController {
  @PutMapping('/profile')
  async editProfile(req: Request, res: Response){
    const { email,firstName,lastName, location, phoneNumber } = req.body;
    const user =  await editUserInfo(email,firstName,lastName, location, phoneNumber);

    return res.json({
      user
    })
  }

  @GetMapping('/info/:email')
  async showInfo(req: Request, res: Response){
    const { email} = req.params;
    const user =  await showUserInfo(email);
    return res.json({
      status: 200,
      desc:"succ",
      data: user
    })
  }


  
  


  



}