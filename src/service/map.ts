import {getAlltasks} from './task'
import {Task} from '../models/task'
const melbdata = require('./melbourne.json')
const fs = require('fs');


type Obj ={
  geometry: Star
   properties:A
}

type Star = {
 
  coordinates: number[][][][]
}

type A = {
  name: string
}


function random(m:number, n:number) {
  return Math.floor(Math.random() * (n - m)) + m
}

export async function getMapService(){
 let return_data:object[] = []
 const result =  await getAlltasks();
 const data1:Array<Obj> = melbdata.features;

 result.map(task_data=>{
  
   data1.map(data2 =>{
    
      if(task_data.location ===data2.properties.name){
          const len  = data2.geometry.coordinates[0][0].length
         
          return_data.push({
            title: task_data.title,
            avatar: task_data.avatar,
            coordinates: data2.geometry.coordinates[0][0][random(0,len)],
            budget:task_data.budget,
            location: task_data.location,
            
          })
          
      }

   })
   }
)
return return_data
}
