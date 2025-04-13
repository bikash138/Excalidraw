import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware"
const { JWT_SECRET } = require("@repo/backend-common/config");import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express()

app.use(express.json())

//middleware


app.get("/", (req,res)=>{
    res.send("Hello there!!!")
})

app.post("/signup", async (req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }
    try{
        
        const user = await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data?.password,
                name: parsedData.data?.name
            }
        })
        res.status(200).json({
            message: "User Created Successfully",
            userId: user.id
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.post("/signin", async (req,res)=>{

    const parsedData = SignInSchema.safeParse(req.body)
        if(!parsedData.success){
            res.json({
                message: "Incorrect Inputs"
            })
            return
        }
        
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data?.username,
            password: parsedData.data?.password
        }
    })
    if(!user){
        res.status(411).json({
            message: "User unauthorized"
        })
    }

    const token = jwt.sign({
        userId: user?.id
    },JWT_SECRET)

    res.json({
        message: "Use login Success",
        token: token
    })
    
})

app.post("/room", middleware, async (req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body)
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }

    //@ts-ignore
    const userId = req.userId;
    try{
        const room = await prismaClient.room.create({
            data:{
                slug: parsedData.data?.name,
                adminId: userId
            }
        })
    
        res.json({
            message: "Room Ceated Successfully",
            roomId: room.id
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

app.listen(4000)