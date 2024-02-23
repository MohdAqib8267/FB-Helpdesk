import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js"; 
import dotenv from "dotenv";
dotenv.config();

export const messagesApi=asyncHandler(async(req,res)=>{
    const {from,to,id,message,created_time}=req.body;
    // console.log(req.body);

        try {
            
            //else enter in DB
            const addInDB = await prisma.message.create({
              data: {
                id: id,
                from: {
                  
                    name: from.name,
                    email: from.email,
                    id: from.id,
                  
                },
                message: message,
                created_time: created_time, 
              },
            });
            const addinToData = await Promise.all(
              Array.isArray(to?.data) && to?.data?.map(async(item)=>{
                const {id,name,email}=item;

                const createInToTable = await prisma.toJson.create({
                  data:{
                    id,
                    name,
                    email
                  }
                })
                return createInToTable;
              })
            )

            
            res.json({success:"true",addInDB,addinToData});
        } catch (error) {
            res.json("server error");
            console.log(error); 
        }
})