import{ Controller, Use,  GetMapping, PostMapping,PutMapping, DeleteMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import {getAlltasks,postTask,deleteTask, showTasks, addQuestios, makeOffer, assignTask, completeTask, getAssigned} from '../service/task';
import {Auth} from '../middleware/auth'

@Controller('/task')
class TaskController {

  //browse all tasks
  @Use(Auth)
  @GetMapping('/tasks')
  async getTasks(req: Request, res: Response) {

    const result = await getAlltasks();
    if(result){
      res.json({
        desc: 'succ',
        data: result
      })
    }else{
      res.status(400).json({
        desc: 'Invaild',
        data: []
      });
    }
}

  //post a task
  @PostMapping('/task')
  async postTask(req: Request, res: Response) {
    const {email, title, budget, location,date,details } = req.body;
    const result = await postTask(email,title,budget,location,date,details);

    return res.json({
      desc:"ok",
      data:result
    });
  }


  
  //complete a task
  @PutMapping('/status/:id')
  async completeTask(req: Request, res: Response) {
    const { id } = req.params;
    const result = await completeTask(id);
    if(result){
        return res.status(200).json({
      desc:"ok",
      data: result
    });
    }else{
      return res.json({
          status:400,
          desc:"failed",
      })
    }
  }

  //delete a task
  @DeleteMapping('/task/:id')
  async deleteTask(req: Request, res: Response) {
  //  console.log(123)
    const {id} = req.params;
     await deleteTask(id);
      return res.json({
      status:200,
      desc:"ok"
    });
    }

    // get my posted tasks
    @GetMapping('/mytasks/:userid')
    async showMytasks(req: Request, res: Response){
      const { userid } = req.params;
      const user =  await showTasks(userid);
      return res.json({
        data: user
      })
    }

    //add a question to a task
    @PostMapping('/questions/:taskid')
    async addQuestions(req: Request, res: Response){
      const { taskid } = req.params;
      const { email, content } = req.body;
      const questions =  await addQuestios(taskid, email, content);
      return res.json({
        status: 200,
        desc:"succ",
        data: questions
      })
    }


    // add a offer to a task
    @PostMapping('/offers/:taskid')
    async makeoffer(req: Request, res: Response){
      const { taskid } = req.params;
      const { email, budget } = req.body;
      const offers =  await makeOffer( taskid , email , budget );
      return res.json({
        desc:"succ",
        data: offers
      })
    }

    //assign a task to a offer
    @PostMapping('/assign/:taskid')
    async assignTask(req: Request, res: Response){
      const { taskid } = req.params;
      const { email } = req.body;
      const status =  await assignTask( taskid , email  );
      return res.json({
        desc:"succ",
        data: status
      })
    }

    //get all my assigned tasks
    @GetMapping('/assign/tasks/:email')
    async getAssigned(req: Request, res: Response){
      const { email } = req.params;
      const assignedTasks =  await getAssigned(email);
      return res.json({
        desc:"succ",
        data: assignedTasks
      })
    }





    
  }






