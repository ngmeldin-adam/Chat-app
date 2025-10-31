import express from 'express'
import  "dotenv/config";
 import cors from 'cors';
 import http from 'http';
import userRouter from "./routes/userRoutes.js"
import messageRouter from './routes/messageRoutes.js';
import {Server} from  "socket.io";


 const app = express();
 const server = http.createServer(app);

 // Initalize socket.io server
 export const io = new Server(server,{
   cors:{origin:"*"}
 })


 const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

 //STORE ONLINE USERS
 export const userSocketMap = {};

 //SOCKET.IO CONNECTION HANDLER 
 io.on("connection",(socket)=>{
   const userId = socket.handshake.query.userId;
   console.log("user connected", userId)
   if(userId) userSocketMap[userId] = socket.id;

   //EMIT  ONLINE USERS TO ALL CONNECTED CLIENT
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

   socket.on("disconnect",()=>{
      console.log("User Disconnected",userId);
      delete userSocketMap[userId];
         io.emit("getOnlineUsers",Object.keys(userSocketMap));
   })
 })

 app.use(express.json({limit:"4mb"}));
 app.use(cors())
 

app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)


 const Port = process.env.PORT || 5001 ;
 server.listen(Port , ()=> {
   connect(); 
    console.log(`server is running on port ${Port}`)
 })


