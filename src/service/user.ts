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



export async function editUserInfo(_email:string, _skills:string[], _firstName:string, _lastName:string, _location:string, _about:string , _reviews:string, _overviews:string) {
const res =  await User.findOneAndUpdate({email:_email},{skills:_skills,firstName:_firstName,lastName:_lastName,location:_location,about:_about, reviews:_reviews, overviews:_overviews});
 return res;
}