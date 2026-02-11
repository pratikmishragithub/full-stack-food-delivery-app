import express from "express"
import cors from "cors"
import  connectDB  from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//app config.
const app=express();
const port=4000

//middleware.
app.use(express.json())
app.use(cors()) //excess backend from any fronted.

//db connection.
connectDB();

//api endpoints.
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))  //when hit this path attached image id with this path.
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("API working")
})

//to run the server.
app.listen(port,()=>{
    console.log(`server stared on port no: ${port}`);
})


