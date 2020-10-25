import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import {login} from '../service/login';
import { AccountType,AccountDoc } from '../models/account';




@Controller('/')
class LoginController {


  @PostMapping('/login')
  async login(req: Request, res: Response) {

    const { email,password } = req.body;
    console.log(email,password)
    const result = await login(email,password);
    if(result==='fail'){
      res.json({
        status: 400,
        desc: 'Invaild email or password',
        data: result
      });
    }
    else{
      return res.json({
        status: 200,
        desc: 'ok',
        data: {
         _id: result[0],
         token:result[1],
         email:result[2]
        }
      });
    }
    }
    
}
