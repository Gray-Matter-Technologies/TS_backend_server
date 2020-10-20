enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

export function GetMapping(path: string){
  return function(target: any, key:string) {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', 'get', target, key);
  }
}

export function PostMapping(path: string){
  return function(target: any, key:string) {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', 'post', target, key);
  }
}

export function PutMapping(path: string){
  return function(target: any, key:string) {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', 'put', target, key);
  }
}

export function DeleteMapping(path: string){
  return function(target: any, key:string) {
    Reflect.defineMetadata('path', path, target, key);
    Reflect.defineMetadata('method', 'delete', target, key);
  }
}

