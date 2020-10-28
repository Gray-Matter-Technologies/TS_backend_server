import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
import {getMapService} from '../service/map';



@Controller('/map')
class MapController {

  //return coodrinates info of tasks
  @GetMapping('/tasks')
  async mapInfo(req: Request, res: Response) {
       const result =   await getMapService()

        return res.json(result)
  }

}
