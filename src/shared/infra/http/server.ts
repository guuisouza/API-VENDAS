import 'reflect-metadata'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import cors from "cors";
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination'
import routes from "./routes"
import AppError from "@shared/errors/AppError";
import '@shared/container'
import '@shared/infra/typeorm'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())

app.use(pagination)
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use(errors())

// middleware para tratar exceções
app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => {
  console.log("Server started on port 3333!")
})
