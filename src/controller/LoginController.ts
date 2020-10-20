import 'reflect-metadata';
import { Controller, GetMapping, PostMapping } from '../decorator'
import express, {Request, Response, } from 'express';

@Controller('/user')
class LoginController {

  @PostMapping('/login')
  login(req: Request, res: Response) {
    const { password } = req.body;
    let isLogin = req.session ? req.session.login : false;
    if(isLogin){
      res.send("login");
    }else{
      if(password ==='123' && req.session){
        req.session.login= true;
        res.send('succ');
      }else{
        res.send("failed");
      }
      }
  }

  @GetMapping('/logout')
  logout(req: Request, res: Response) {
    if(req.session){
      req.session.login = undefined;
    }
    res.redirect('/user');
   }
  
  


  @GetMapping('/')
  home(req: Request, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if(isLogin){
      res.send(`
      <html>
        <body>
          <a href='/user/logout'>out</a>
        </body>
      </html>
      `)
    }else{
      res.send(`
      <html>
        <body>
        <form method = "post" action ="/user/login">
          <input type ="password" name="password" />
          <button>login</button>
        </form>
        </body>
      </html>
      `);
    }
  }
}