
import {Task} from '../models/task'
import {User} from '../models/user'




export async function postTask(_email:string, _title:string,_price:number,_buget:number,_avatar:string,_location:string,_date:Date,_status:number,_details:object) {


  const task = new Task(
    {
      email: _email,
      title: _title,
      price:_price,
      buget:_buget,
      avatar:_avatar,
      location:_location,
      date:_date,
      status:_status,
      details: _details
    }
  )
  console.log(task)
  const result = await task.save()
 
  return result; 
}



export async function changeTaskStatus(_id:string,_status:number) {
  const result = await Task.findByIdAndUpdate(_id, {status:_status})
  return result; 
}



export async function deleteTask(_id:string) {
  const result = await Task.findByIdAndDelete(_id);
}

export async function getAlltasks() {
  const tasks = await Task.find({status: 1,}).sort({date: 'desc'}).populate('user', 'avatar lastName').exec()
  return tasks; 
}


export async function showTasks(_id:string) {
  const result = await Task.find({email:_id}).populate('user','avatar lastName').exec()
  console.log(result)
  return result;
}


export async function addQuestios(_taskId:string, _email:string, _content:string) {
  const user = await User.findOne({email:_email})
  try{
  const user_avatar = user?.avatar;
  const user_lastName = user?.lastName;
  
  const task = await Task.findById(_taskId);
  const question = {name:user_lastName,avatar:user_avatar,content:_content}
  console.log(task?.questions)
  await task?.questions.push(question)
  await task?.save()
  return task?.questions;
  }catch(e){
    console.log(e)
  }
}