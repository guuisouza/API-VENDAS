import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // verifica se no cabeçalho de toda req existe um token
  const authHeader = req.headers.authorization

  if(!authHeader) {
    throw new AppError('JWT Token is missing')
  }

  // bearer tokenskadmklasm
  const [, token] = authHeader.split(' ')

  try {
    const decodedToken = verify(token, authConfig.jwt.secret) // 1- token recebido 2- secret

    const { sub } = decodedToken as TokenPayload

    req.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('invalid JWT Token.')
  }
}
