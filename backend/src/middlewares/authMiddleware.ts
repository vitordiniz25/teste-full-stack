import { Request, Response, NextFunction } from "express";  
import jwt from 'jsonwebtoken'
import User, { IUser } from "../models/User";

declare global {
    namespace Express {
      interface Request {
        user?: IUser; // Adiciona a propriedade user ao objeto Request
      }
    }
  }

export const authMiddleware = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')

        if(!token) {
            return res.status(401).json({
                message: 'Token not provided'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string }

        const user = await User.findById(decoded.id)

        if(!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        req.user = user;
        next();
    } catch(error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}