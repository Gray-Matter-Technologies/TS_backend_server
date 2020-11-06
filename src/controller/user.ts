import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, Use,  GetMapping, PostMapping,PutMapping} from '../decorator';
import {editUserInfo, showUserInfo} from '../service/user';
import { validateToken } from '../utils/jwt'
import {authSerivce} from '../service/auth'
import { body, check, validationResult } from "express-validator";
import { Auth } from '../middleware/auth';
import{Logger} from '../middleware/logger'


@Controller('/user')
class UserController {

  @Use(Logger)
  @PostMapping('/Auth')
  async auth(req:Request, res:Response) {
    const {token} = req.body;
    const decodedToken = validateToken(token);
    const result = await authSerivce(decodedToken.id);
    if(typeof result==='object'){
       return res.json({
          email:result.email,
          avatar:result.avatar
    })
    }else{
      return res.status(400).json({
        error: "invalid token"
      })
    }
  }

  @Use(Auth)
  @Use(Logger)
  @PutMapping('/profile')
  async editProfile(req: Request, res: Response){
    await check("email", "Email is not valid").isEmail().run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        e:errors
      })
  } 
    

    const { email,
            firstName,
            lastName, 
            location, 
            phoneNumber } = req.body;
    console.log(email)
    const user =  await editUserInfo(
       email,
       firstName, 
       lastName,
       location, 
       phoneNumber);

    return res.json({
      user
    })
  }

 
  @Use(Auth)
  @Use(Logger)
  @GetMapping('/info/:email')
  async showInfo(req: Request, res: Response){
    console.log(req)
    const { email} = req.params;
    const user =  await showUserInfo(email);
    return res.json({
      data: user
    })
  }


  
  


  



}