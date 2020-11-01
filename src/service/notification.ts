import {Task} from '../models/task'

export async function getAllNotifications(email : string) {
  const notifications = await Task.find({email: email});
  console.log("<<<<<notifications<<<",notifications);
  return notifications;
}
