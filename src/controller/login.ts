import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import {login} from '../service/login';
import { Auth } from '../middleware/auth';
import{Logger} from '../middleware/logger'





@Controller('/')
class LoginController {

  @Use(Logger)
  @PostMapping('/login')
  async login(req: Request, res: Response) {

    const { email,password } = req.body;
    const result = await login(email,password);
    if(result==='fail'){
      res.status(400).json({
        error: 'Invalid username or password, please try again'
      });
    }
    else{
      return res.json({
        data: {
         _id: result[0],
         token:result[1],
         email:result[2],
         avatar:result[3]
        }
      });
    }
    }
    
}
