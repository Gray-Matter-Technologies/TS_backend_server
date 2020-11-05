import { RequestHandler } from 'express';



export function Use(middleware:any){
  return function(target: any, key: string){
    const orginMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
    orginMiddlewares.push(middleware)
    Reflect.defineMetadata('middlewares', orginMiddlewares, target, key)
  }
}