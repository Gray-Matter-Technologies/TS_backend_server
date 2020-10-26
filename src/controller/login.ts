import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import {login} from '../service/login';





@Controller('/')
class LoginController {

  //user login
  @PostMapping('/login')
  async login(req: Request, res: Response) {

    const { email,password } = req.body;
    console.log(email,password)
    const result = await login(email,password);
    if(result==='fail'){
      res.status(400).json({
        desc: 'Invaild email or password',
        data: result
      });
    }
    else{
      return res.json({
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
