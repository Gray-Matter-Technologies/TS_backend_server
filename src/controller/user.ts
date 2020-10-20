import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, Use,  GetMapping, PostMapping,PutMapping} from '../decorator';
import {editUserInfo} from '../service/user';
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
class UserController {
  @PutMapping('/profile')
  async editProfile(req: Request, res: Response){
    const { email,skills,firstName,lastName, location,about,reviews,overviews} = req.body;
    const user =  await editUserInfo(email,skills,firstName,lastName, location,about,reviews,overviews);

    return res.json({
      status: 200,
      desc:"succ",
      data: user
    })
  }


}