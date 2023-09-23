import express from 'express'
import { login, register, getAll, deleteUser, updateUserName } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.get("/", authMiddleware, getAll)
router.delete("/:id", authMiddleware, deleteUser)
router.put("/:id", authMiddleware, updateUserName)
router.post("/login", login)
router.post("/register", register)

export default router;