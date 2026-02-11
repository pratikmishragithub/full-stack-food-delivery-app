import express from 'express'
import { addFood,listFood,removeFood} from '../controllers/foodController.js'
import multer from 'multer' //for image storage system.

const foodRouter=express.Router();

//Image storage engine.
//multer package for creating the image.
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`) //it will make file name unique.
    }
})  

const upload=multer({storage})
foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;

