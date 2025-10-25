import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, SignInSChema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/signup",async (req,res) => {
    const result = CreateUserSchema.safeParse(req.body)
    if(!result.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }

    try{
        await prismaClient.user.create({
            data: {
                email: result.data.username,
                password: result.data.password,
                name: result.data.name
            }
        });
    } catch(e){
        return res.status(411).json({
            message: "User already exists with this username"
        })
    }
    
    res.json({
        message: "User Created Successfully!"
    })
})

app.post("/signin",async (req,res) => {
    const result = SignInSChema.safeParse(req.body)
    if(!result.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: result.data.username,
            password: result.data.password
        }
    });
    if(!user){
        return;
    }
    const userId = user.id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/room", middleware ,(req,res) => {
    const result = CreateRoomSchema.safeParse(req.body)
    if(!result.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }

    const room = prismaClient.room.create({
        data: {
            slug: result.data.name,
            adminId: req.userId
        }
    });

    res.json({
        roomId: 123
    })
})

app.listen(3001);
