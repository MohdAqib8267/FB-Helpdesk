import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();

export const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    try {
        if(!email|| !password){
            return res.status(400).json({message:"Something is missing."});
        }
        //find user in DB
        const user = await prisma.user.findFirst({
            where:{email},
        })
        if(!user){
            return res.status(400).json({message:"Inavlid Credentials."});
        }

        // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

        //if user valid, then generate token
        const token = jwt.sign({user},process.env.JWTKEY,{ expiresIn: '24h'});
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

export const signup =asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"Something is missing."});
        }

        //check user already exist
        const existingUser = await prisma.user.findFirst({
            where:{email}
        })
        if(existingUser){
            return res.status(401).json({message:"User Already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            }
        })
         // Generate token for the new user
         const token = jwt.sign({ user: newUser }, process.env.JWTKEY, { expiresIn: '12h' });

         return res.json({ success: true, token, newUser:newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})