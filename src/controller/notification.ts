import{ Controller, Use,  GetMapping, PostMapping,PutMapping, DeleteMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import { getAllNotifications } from '../service/notification';
import { Logger } from '../middleware/logger';
import { Auth } from '../middleware/auth';

@Controller('/notification')
class NotificationController {
  //browse all notification
  @Use(Auth)
  @Use(Logger)
  @PostMapping('/all')
  async getNotifications(req: Request, res: Response) {
    const {email} = req.body;
    const result = await getAllNotifications(email);
        if(result){
            let questions:Object[] = [];
            result.forEach(item=>{
                item.questions.forEach(quesItem=>{
                    questions.push(quesItem);
                });
            });
            res.json({
                desc: 'succ',
                data: questions
            });
        }else{
            res.status(400).json({
                desc: 'Invaild',
                data: []
            });
        }
    }
}