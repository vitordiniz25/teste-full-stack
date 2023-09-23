import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
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

export const deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params.id;
  
        if (!userId) {
          res.status(400).json({ message: 'Invalid user ID' });
          return;
        }
  
        const deletedUser = await User.findByIdAndDelete(userId);
  
        if (!deletedUser) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
  
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        next(error);
      }
    }
);

export const updateUserName = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params.id;
        const newName = req.body.fullName; 
  
        if (!userId) {
          res.status(400).json({ message: 'Invalid user ID' });
          return;
        }
  
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { fullName: newName },
          { new: true }
        );
  
        if (!updatedUser) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
  
        res.json({
          message: 'User name updated successfully',
          user: updatedUser,
        });
      } catch (error) {
        next(error);
      }
    }
  );
  
  