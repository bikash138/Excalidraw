import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware"
import {JWT_SECRET} from "@repo/backend-common/config"
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"

const app = express()

app.use(express.json())

//middleware


app.get("/", (req,res)=>{
    res.send("Hello there!!!")
})

app.post("/signup", (req,res)=>{
    const data = CreateUserSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }
})

app.post("/signin", (req,res)=>{
    try{
        const data = SignInSchema.safeParse(req.body)
        if(!data.success){
            res.json({
                message: "Incorrect Inputs"
            })
            return
        }
    
        const userId = req.body.userId
        const token = jwt.sign({userId}, JWT_SECRET)
        res.json({
            token: token
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

app.post("/room", middleware, (req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body)
    if(!data.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }

    res.json({
        roomId: "123"
    })
})

app.listen(4000)