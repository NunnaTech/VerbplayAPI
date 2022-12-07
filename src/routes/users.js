import {Router} from "express";
import {
    countUsers, countVerbs,
    createUser,
    deleteUser, getPercentVerbsUser,
    getUser,
    getUsers, login,
    updateUser, updateVerbsUser
} from "../controllers/users.controller.js";

const router = Router()

router.get('/users',getUsers)
router.get('/users/count',countUsers)
router.get('/users/:id',getUser)
router.get('/users/verbsPercent/:id',getPercentVerbsUser)
router.get('/users/countVerbs/:id',countVerbs)
router.post('/users/login',login)
router.post('/users',createUser)
router.put('/users/update/:id',updateUser)
router.put('/users/verb',updateVerbsUser)
router.delete('/users/:id',deleteUser)

export default router