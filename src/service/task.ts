
import {Task} from '../models/task'

export async function getAlltasks() {
  const tasks = await Task.find({status: 2}).sort({date: 'desc'})
  return tasks; 
}


export async function postTask(_title:string,_price:number,_buget:number,_avatar:string,_location:string,_date:Date,_status:number,_details:object) {

  const task = new Task(
    {
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