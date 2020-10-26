import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
var multer = require('multer')

import {updateAvatar} from '../service/user'

const storage = multer.diskStorage({
  destination: function (req:Request, file:File, cb:any) {
  cb(null, 'public')
},
filename: function (req:Request, file:any, cb:any) {
  const {email} = req.params
  cb(null, Date.now() +'-'+ email +'-' +file.originalname )
}
})

const upload = multer({ storage: storage }).single('file')

@Controller('/')
class UploadController {
  //user update avatar
  @PostMapping('/upload/:email')
  async uploadAvatar(req: Request, res: Response){
    const{ email } = req.params
    

  upload(req, res, async function (err:any) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }   
        await updateAvatar(email, req.file.filename)
        return res.status(200).json({avatar : req.file.filename})
})
  }
}
