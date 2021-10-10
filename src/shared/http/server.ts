import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import 'express-async-errors'

import '@shared/container'
import createConnection from '@shared/database'
import { AppError } from '@shared/errors/AppError'
import { routes } from '@shared/http/routes'

createConnection()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message })
    }

    console.error(err)

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error - ${err.message}`
    })
  }
)

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server started'))