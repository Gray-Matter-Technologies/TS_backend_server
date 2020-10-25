import{ Controller, Use,  GetMapping, PostMapping} from '../decorator';
import express, {NextFunction, Request, Response, } from 'express';
import 'reflect-metadata';
var multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req:Request, file:File, cb:any) {
  cb(null, 'public')
},
filename: function (req:Request, file:any, cb:any) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

const upload = multer({ storage: storage }).single('file')

@Controller('/')
class UploadController {

  @PostMapping('/upload/:id')
  async upload(req: Request, res: Response){
    const{ id } = req.params
  upload(req, res, function (err:any):any {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }   
        console.log(id)
        return res.status(200).json({avatar : req.file.filename})

})
  }
}
