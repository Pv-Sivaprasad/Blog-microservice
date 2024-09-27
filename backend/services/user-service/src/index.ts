import  express  from "express";
import mongoose from "mongoose";
import userRoute from './routes/userRoute'
import dotenv from 'dotenv';
import { connectRabbitMQ } from "./config/rabbitmq";


dotenv.config();


const app=express()
const port=process.env.PORT
app.use(express.json())



mongoose.connect(process.env.MONGODB_URI!)
.then(()=>{
    console.log('connected to mongodb');
    
}).catch((err)=>{
    console.log('error connecting to mongodb');
    console.log(err);
    
    
})

connectRabbitMQ()
app.use('/',userRoute)


app.listen(port,()=>{console.log(`user service is running on http://localhost:${port}`)})