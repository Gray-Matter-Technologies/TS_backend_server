import {User} from '../models/user'



export async function authSerivce(_token:string) {
  const user = await User.findById(_token);

  if(user){
    return {      
     email: user?.email,
     avatar: user?.avatar
    }
  }else{
    return 'invalid user'
  }



}