import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import postRoute from './routes/postRoute'

dotenv.config();

const app=express()
const port=process.env.PORT

app.use(express.json())


mongoose.connect(process.env.MONGODB_URI!)
.then(()=>{
    console.log('conected to db');
    
}).catch((err)=>{
    console.log('error connecting to db');
    
})

app.use('/',postRoute)

app.listen(port,()=>console.log(`post service is running on http://localhost:${port}`))