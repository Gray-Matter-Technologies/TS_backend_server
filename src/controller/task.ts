import{ Controller, Use,  GetMapping, PostMapping,PutMapping, DeleteMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import {getAlltasks,postTask,changeTaskStatus,deleteTask} from '../service/task';



@Controller('/task')
class LoginController {
  @GetMapping('/tasks')
  async getTasks(req: Request, res: Response) {

    const result = await getAlltasks();
    if(result ){
      res.json({
        status: 200,
        desc: 'succ',
        data: result
      })
    }else{
      res.json({
        status: 400,
        desc: 'Invaild',
        data: []
      });
    }
}

  @PostMapping('/task')
  async postTask(req: Request, res: Response) {

    const {title, price, buget, avatar, location,date,status,details } = req.body;
    const result = await postTask(title,price,buget,avatar,location,date,status,details);

    return res.json({
      status:200,
      desc:"ok",
      data:result
    });
  }


  @PutMapping('/status/:id')
  async changeTaskStatus(req: Request, res: Response) {
    const {status } = req.body;
    const {id} = req.params;
    const result = await changeTaskStatus(id,status);
    if(result){
        return res.json({
      status:200,
      desc:"ok",
  
    });
    }else{
      return res.json({
          status:400,
          desc:"failed",
      })
    }
  }

  @DeleteMapping('/task/:id')
  async deleteTask(req: Request, res: Response) {
    console.log(123)
    const {id} = req.params;
     await deleteTask(id);
      return res.json({
      status:200,
      desc:"ok"
    });
    }





    
  }






