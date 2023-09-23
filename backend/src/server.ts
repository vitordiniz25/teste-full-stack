import express, { Application } from 'express'

import dotenv from 'dotenv'
import connectDB from '../config/db'

const app: Application = express()

dotenv.config()

connectDB();

app.use(express.json())

const PORT = process.env.PORT || 8080;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`))