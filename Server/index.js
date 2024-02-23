import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRoute } from "./routes/userRoute.js";
import { messageRoute } from "./routes/messageRoute.js";

dotenv.config();

const app = express();

// middlewares  
app.use(express.json()); // parsed json data
app.use(cookieParser()); //extract cookies
app.use(cors()); //handle cors problem across different domains

//routes
app.use('/api/user',userRoute);
// app.use('/api/user',messageRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is running at Port ${process.env.PORT}`);
})