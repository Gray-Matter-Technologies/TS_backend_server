import { RequestHandler } from 'express';
import router from '../router'

enum Method {
  get = 'get',
  post = 'post'
}

export function Controller(root: string){
  return (
    (target: any) => {
      for(let key in target.prototype) {
       const path = Reflect.getMetadata('path', target.prototype, key);
       const method:Method = Reflect.getMetadata('method', target.prototype, key);
       const middlewares:any[]= Reflect.getMetadata('middlewares', target.prototype, key);
       const handler = target.prototype[key];
       if(path && method) {
         const fullPath = root ==='/'? path : `${root}${path}`
         if(middlewares && middlewares.length){
          router[method](fullPath, ...middlewares, handler) 
         }else{
           router[method](fullPath, handler)
         }
         
       }
      }
    })
}









