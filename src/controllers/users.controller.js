import {v4 as uuid} from 'uuid'
import {getConnection} from "../database.js";
export const getUsers = (req,res)=>{
    const verbs = getConnection().data.users
    res.json(verbs)
}

export const createUser = async (req,res)=>{
    const newUser = {
        id:uuid(),
        name:req.body.name,
        lastName:req.body.lastName,
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        verbs:[]
    }
    try {
        const db = getConnection()
        db.data.users.push(newUser)
        await db.write()
        res.json(newUser)
    }catch (error) {
        return res.status(500).send({info:error.message})
    }
}

export const getUser = (req,res)=>{
    const user = getConnection().data.users.find(obj => obj.id == req.params.id)
    if (!user) return res.status(404).send({info:'404',error:true})
    res.json(user)
}

export const login = (req,res) => {
    const user = getConnection().data.users.find(obj => obj.userName == req.body.userName && obj.password == req.body.password)
    if (!user) return res.status(404).send({info:'404',error:true})
    res.json(user)
}

export const updateUser = async (req,res)=>{
    const db = getConnection()
    const user = db.data.users.find(obj => obj.id === req.params.id)
    if (!user) return res.status(404).send({info:'404',error:true})

    user.name = req.body.name
    user.lastName = req.body.lastName
    user.userName = req.body.userName
    user.email = req.body.email
    user.password = req.body.password
    user.verbs = req.body.verbs

    db.data.verbs.map(u => u.id == req.params.id ? user:u)
    await db.write()
    res.json({info:'Successful Updated',data:user})
}

export const deleteUser = async (req,res)=>{
    const db = getConnection()
    const user = db.data.users.find(obj => obj.id === req.params.id)
    if (!user) res.status(404).send({info:'404',error:true})
    const newUsers = db.data.users.filter(obj => obj.id != req.params.id)
    db.data.users = newUsers
    await db.write()
    res.json({info:'Successful Elimination',data:user})
}

export const countUsers = (req,res)=>{
    const total = getConnection().data.users.length
    res.json({info:total})
}