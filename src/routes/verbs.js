import {Router} from "express";
import {
    countVerbs,
    createVerb, deleteVerb,
    getVerb,
    getVerbs, updateVerb,
} from "../controllers/verbs.controller.js";

const router = Router()

router.get('/verbs',getVerbs)
router.get('/verbs/count',countVerbs)
router.get('/verbs/:id',getVerb)
router.post('/verbs',createVerb)
router.put('/verbs/:id',updateVerb)
router.delete('/verbs/:id',deleteVerb)

export default router