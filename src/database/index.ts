import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
mongoose.set('debug', true)
mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))