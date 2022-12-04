import {Router} from "express";
import {count, createVerb, deleteTask, getVerb, getVerbs, updateTask} from "../controllers/verbs.controller.js";

const router = Router()

router.get('/verbs',getVerbs)
router.get('/verbs/count',count)
router.get('/verbs/:id',getVerb)
router.post('/verbs',createVerb)
router.put('/verbs/:id',updateTask)
router.delete('/verbs/:id',deleteTask)

export default router