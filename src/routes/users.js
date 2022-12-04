import {Router} from "express";
import {
    countUsers,
    createUser,
    deleteUser,
    getUser,
    getUsers, login,
    updateUser
} from "../controllers/users.controller.js";

const router = Router()

router.get('/users',getUsers)
router.get('/users/count',countUsers)
router.get('/users/:id',getUser)
router.post('/users/login',login)
router.post('/users',createUser)
router.put('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)

export default router