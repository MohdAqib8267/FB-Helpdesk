import express from "express";
import { messagesApi } from "../controllers/messageController.js";

const router = express.Router();

router.post('/message',messagesApi);


export {router as messageRoute};