import {v4 as uuid} from 'uuid'
import {getConnection} from "../database.js";
export const getVerbs = (req,res)=>{
    const verbs = getConnection().data.verbs
    res.json(verbs)
}

export const createVerb = async (req,res)=>{
    const newVerb = {
        id:uuid(),
        name:req.body.name,
        spanish:req.body.spanish,
        english:req.body.english
    }
    try {
        const db = getConnection()
        db.data.verbs.push(newVerb)
        await db.write()
        res.json(newVerb)
    }catch (error) {
        return res.status(500).send({message:error.message})
    }
}

export const getVerb = (req,res)=>{
    const verb = getConnection().data.verbs.find(obj => obj.id == req.params.id)
    if (!verb) return res.status(404).send({message:'404'})
    res.json(verb)
}

export const updateTask = async (req,res)=>{
    const db = getConnection()
    const verb = db.data.verbs.find(obj => obj.id === req.params.id)
    if (!verb) return res.status(404).send({message:'404'})
    verb.name = req.body.name
    verb.spanish = req.body.spanish
    verb.english = req.body.english
    db.data.verbs.map(v => v.id == req.params.id ? verb:v)
    await db.write()
    res.json({message:'Successful Updated',data:verb})
}

export const deleteTask = async (req,res)=>{
    const db = getConnection()
    const verb = db.data.verbs.find(obj => obj.id === req.params.id)
    if (!verb) return res.status(404).send({message:'404'})
    const newVerbs = db.data.verbs.filter(obj => obj.id != req.params.id)
    db.data.verbs = newVerbs
    await db.write()
    res.json({message:'Successful Elimination',data:verb})
}

export const count = (req,res)=>{
    const total = getConnection().data.verbs.length
    res.json({total:total})
}

