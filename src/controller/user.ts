import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, Use,  GetMapping, PostMapping,PutMapping} from '../decorator';
import {editUserInfo, showUserInfo} from '../service/user';
import { validateToken } from '../utils/jwt'
import {authSerivce} from '../service/auth'


//edit use info
@Controller('/user')
class UserController {

  @PostMapping('/Auth')
  async auth(req:Request, res:Response) {
    const {token} = req.body;
    const decodedToken = validateToken(token);
    console.log(decodedToken.id)
    const result = await authSerivce(decodedToken.id);
    console.log(result)
    if(typeof result==='object'){
       return res.json({
          email:result.email,
          avatar:result.avatar
    })
    }
   
  }


  @PutMapping('/profile')
  async editProfile(req: Request, res: Response){
    const { email,firstName,lastName, location, phoneNumber } = req.body;
    const user =  await editUserInfo(email,firstName,lastName, location, phoneNumber);

    return res.json({
      user
    })
  }

  //get user info
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