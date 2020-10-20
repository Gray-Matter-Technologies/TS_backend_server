import { RequestHandler } from 'express';



export function Use(middleware:RequestHandler){
  return function(target: any, key: string){
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}