import express from 'express'
import mongoose from 'mongoose'
import commentRoute from './routes/commentRoute'

import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URI!)
   .then(() => {
      console.log('connected to db');

   }).catch(() => {
      console.log('error in connecting to db');

   })

app.use('/', commentRoute)

app.listen(port, () => { console.log(`comment service  running on http://localhost:${port} `) })
