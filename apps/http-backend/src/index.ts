import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware"
const { JWT_SECRET } = require("@repo/backend-common/config");import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express()

app.use(express.json())

//Deafault Endpoint
app.get("/", (req,res)=>{
    res.send("Hello there!!!")
})

//Sign Un Endpoint
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

//Sign In Endpoint
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

//Create Room Endpoint
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

app.get("/chats/:roomId", async (req,res)=>{
    const roomId = Number(req.params.roomId)
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })
    res.status(200).json({
        message: "Old messages fetched",
        messages
    })
})

app.get("/room/:slug", async (req,res)=>{
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        }
    })
    res.status(200).json({
        room
    })
})

app.listen(4000, ()=>{
    console.log("You http-server is running at PORT 4000")
})