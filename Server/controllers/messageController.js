import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js"; 
import dotenv from "dotenv";
dotenv.config();

export const messagesApi=asyncHandler(async(req,res)=>{
    const {from,to,id,message,created_at}=req.body;
    console.log(req.body);
    
        try {
            //first check message is present in db or not
            const existInDB=await prisma.message.findFirst({
                where:{
                    msg_id: id,
                }
            })
            //if present, dont add in DB
            if(existInDB){
                return res.json({message:'message is Already present in DB'});
            }
            //else enter in DB
            const addInDB = await prisma.message.create({
                data: {
                  msg_id: id,
                  from: {
                    name: from.name,
                    email: from.email,
                    id: from.id,
                  },
                  to: Array.isArray(to)
                    ? {
                        connect: to.map((recipient) => ({
                          name: recipient.name,
                          email: recipient.email,
                          id: recipient.id,
                        })),
                      }
                    : {
                        name: to.name,
                        email: to.email,
                        id: to.id,
                      },
                  message: message,
                  created_at: created_at,
                },
              });
              
            res.json({success:"true",addInDB});
        } catch (error) {
            res.json("server error");
            console.log(error);
        }
})