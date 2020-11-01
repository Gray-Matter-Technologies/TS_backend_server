
import {Task} from '../models/task'
import {User} from '../models/user'




export async function postTask(_email:string, _title:string,_budget:number,_location:string,_date:Date,_details:object) {
  const avatar = await User.findOne({email:_email},'avatar')
 

  console.log(avatar)
  const task = new Task(
    {
      email: _email,
      title: _title,
      budget:_budget,
      avatar:avatar?.avatar,
      location:_location,
      date:_date,
      status:1,
      details: _details,
      assignedTo: ''
    }
  )
  //console.log(task)
  const result = await task.save()
 
  return result; 
}



 async function changeTaskStatus(_id:string,_status:number) {
  const result = await Task.findByIdAndUpdate(_id, {status:_status})
  return result; 
}



export async function completeTask(_id:string) {
  const result = await changeTaskStatus(_id, 3);
  return result?.status;
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
  //console.log(task?.questions)
  await task?.questions.push(question)
  await task?.save()
  return task?.questions;
  }catch(e){
    console.log(e)
  }
}


export async function makeOffer(_taskId:string, _email:string, _budget:string) {
  const user = await User.findOne({email:_email})
  try{
  const user_avatar = user?.avatar;
  const user_lastName = user?.lastName;
  
  const task = await Task.findById(_taskId);
  const offer = {name:user_lastName,avatar:user_avatar,budget:_budget}
  //console.log(task?.questions)
  await task?.offers.push(offer)
  await task?.save()
  return task?.offers;
  }catch(e){
    console.log(e)
  }
  
}

export async function assignTask(_taskId:string,_email:string){
  const task = await Task.findOne({_id:_taskId});
  try{
      await task?.update({assignedTo:_email})
      await changeTaskStatus(_taskId,2)
      await task?.save()
      return task?.status
  }catch(e){
    console.log(e)
  }
}


export async function getAssigned(_email:string){
  const tasks = await Task.find({assignedTo:_email});
  return tasks;
}


