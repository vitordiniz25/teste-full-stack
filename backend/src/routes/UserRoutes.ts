import express from 'express'
import { login, register, getAll } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get("/", authMiddleware, getAll)
router.post("/login", login)
router.post("/register", register)

export default router;