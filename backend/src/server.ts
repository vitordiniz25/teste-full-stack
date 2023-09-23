import express, { Application } from 'express'

import dotenv from 'dotenv'

const app: Application = express()

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT || 8080;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`))