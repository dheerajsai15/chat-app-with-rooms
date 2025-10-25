import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, SignInSChema, CreateRoomSchema } from "@repo/common/types"

const app = express();

app.use(express.json());

app.post("/signup", (req,res) => {
    const data = CreateUserSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }
    res.json({
         
    })
})

app.post("/signin", (req,res) => {
    const data = SignInSChema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }


    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/room", middleware ,(req,res) => {
    const data = CreateRoomSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message: "Incorrect Inputs!"
        })
    }

    res.json({
        roomId: 123
    })
})

app.listen(3001);
