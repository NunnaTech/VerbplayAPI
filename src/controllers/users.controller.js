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
    if (!user) return res.status(404).send({info:'404',data:'',error:true})
    res.json(user)
}

export const login = (req,res) => {
    const user = getConnection().data.users.find(obj => obj.userName == req.body.userName && obj.password == req.body.password)
    if (!user) return res.status(404).send({info:'404',data:'',error:true})
    res.json(user)
}

export const updateUser = async (req,res)=>{
    const db = getConnection()
    let user = db.data.users.find(obj => obj.id == req.params.id)
    if (!user) return res.status(404).send({info:'404',data:'',error:true})
    user = Object.assign(user,req.body)
    db.data.users.map(u => u.id == req.params.id ? user:u)
    await db.write()
    res.json({info:'Successful Updated',data:user})
}

export const deleteUser = async (req,res)=>{
    const db = getConnection()
    const user = db.data.users.find(obj => obj.id == req.params.id)
    if (!user) res.status(404).send({info:'404',data:'',error:true})
    const newUsers = db.data.users.filter(obj => obj.id != req.params.id)
    db.data.users = newUsers
    await db.write()
    res.json({info:'Successful Elimination',data:user,error:false})
}

export const countUsers = (req,res)=>{
    const total = getConnection().data.users.length
    res.json({info:total})
}

export const countVerbs = (req,res) => {
    const db = getConnection()
    const user = db.data.users.find(obj => obj.id == req.params.id)
    if (!user) res.status(404).send({info:'404',data:'',error:true})
    res.json({info:'200',data:user.verbs.length,error:false})
}


export const updateVerbsUser = async (req,res) => {
    const db = getConnection()
    const user = db.data.users.find(obj => obj.id == req.body.id)
    if (!user) res.status(404).send({info:'404',data:{},error:true})
    if (user.verbs.find(v => v.id == req.body.verb.id)){
        res.status(200).send({info:'Exist',data:'',error:true})
    }else{
        user.verbs.push(req.body.verb)
        db.data.users.map(u => u.id == req.params.id ? user:u)
        await db.write()
        res.json({info:'All Verbs Successful Updated',data:user,error:false})
    }
}

export const getPercentVerbsUser = (req,res) => {
    const db = getConnection()
    let dbVerbs = [0,0,0]
    let userVerbs = [0,0,0]
    const user = db.data.users.find(obj => obj.id == req.params.id)
    if (!user) res.status(404).send({info:'404',data:{},error:true})
    db.data.verbs.map((obj,index)=>{
        switch (obj.level) {
            case 1:
                dbVerbs[0]++
                break
            case 2:
                dbVerbs[1]++
                break
            case 3:
                dbVerbs[2]++
                break
        }
    })
    user.verbs.map((verb,index)=>{
        switch (verb.level) {
            case 1:
                userVerbs[0]++
                break
            case 2:
                userVerbs[1]++
                break
            case 3:
                userVerbs[2]++
                break
        }
    })
    res.json({info:'200',data:[Math.ceil(userVerbs[0]*100/dbVerbs[0]),
            Math.ceil(userVerbs[1]*100/dbVerbs[1]),
        Math.ceil(userVerbs[2]*100/dbVerbs[2])],error:false})
}