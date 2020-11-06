import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import{ Controller, PostMapping, Use} from '../decorator';
import { generateToken } from '../utils/jwt'
import {addAccount} from '../service/account';
import{Logger} from '../middleware/logger'
import { body, check, validationResult } from "express-validator";


@Controller('/user')
class DataController {
  
  @Use(Logger)
  @PostMapping('/signUp')
  async addAccount(req: Request, res: Response){
    
    //precheck params
    await check("email", "Email is not valid").isEmail().run(req);
    await check("password", "Password must be at least 4 characters long").isLength({ min: 6 }).run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        e:errors
      })
  }

    const { email,password } = req.body;
    const result =await addAccount(email,password);

    if(result ==='conflict'){
      return res.status(409).json({
        error: 'user already exist'
      })
    }

    else{
      const token = generateToken(result._id)
      return res.json({result, token});
    }
    
  }
  
}