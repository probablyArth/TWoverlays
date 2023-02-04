import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import { config } from 'dotenv'
import * as middlewares from './middlewares.js'

// @ts-expect-error svelte generated frontend
import { handler } from '../build/handler.js'
import taskRouter from './routes/tasks.js'
config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/task', taskRouter)
app.use('/overlay', handler)
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
