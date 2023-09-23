import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({}).select('-password')
    res.status(201).json({
        success: true,
        count: users.length,
        users
    })
})

export const login = asyncHandler (async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(await user.comparePassword(password)) {
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                token: generateToken(user._id)
            }
        })
    } else {
        res.status(401)
        throw new Error("Email or password incorrect")
    }
})

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, fullName, password } = req.body;

    const user = new User({
        email, fullName, password
    })

    await user.save();

    res.status(201).json({
        success: true,
        user: {
            email: user.email,
            fullName: user.fullName,
            token: generateToken(user._id)
        }
    })
})