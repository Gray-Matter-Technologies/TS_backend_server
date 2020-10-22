import {User} from '../models/user'

export async function createInfoTemplate(_email:string) {
 const user =  new User({
    email :_email,
    firstName: "",
    lastName: "",
    location:"location",
    about: "please write your desc",
    skills: ["his user has not added any skills yet."],
    reviews: "no reviews yet",
    overview: "no overview yet"
  })

  await user.save();
  return user;
}



export async function editUserInfo(_email:string, _firstName:string, _lastName:string, _location:string, _phoneNumber:string) {
const res =  await User.findOneAndUpdate({email:_email},{email:_email,firstName:_firstName,lastName:_lastName,location:_location,phoneNumber:_phoneNumber},{ "new": true});
 return res;
}

export async function showUserInfo(_email:string) {
  const res =  await User.findOne({email:_email});

  return ({
    email:res?.email,
    firstName:res?.firstName,
    lastName:res?.lastName,
    location:res?.location,
    phoneNumber:res?.phoneNumber,
    avatar:res?.avatar
  })
  }