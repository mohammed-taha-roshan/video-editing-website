const express=require("express");   //importing express or creating instance of ecpress
const app=express();    
const http=require("http");     //acessing HTTP from module
const cors=require("cors");     //CORS solves all sorts of problems those arrive
const{Server}=require("socket.io");     //importing socket.io module

app.use(cors());    //passing it to app instance
const server=http.createServer(app);    //express server created

const io = new Server(server,
    {cors:{origin:"http://localhost:3000",methods:["GET","POST"],},});      //creating instance of socket.io server nd connecting it to express server

io.on("connection",(socket)=>{
    console.log(`USER CONNECTED ${socket.id}`);

    //connection
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`USER JOINED WITH ID: ${socket.id} joined room:${data}`);
    });

    //send 
    socket.on("send_message",(data)=>{
        console.log("sent",data);
        //recieve
        socket.to(data.room).emit("recieve_message",data);
    })

    //disconnect function...
    socket.on("disconnect",()=>{
        console.log("USER DISCONNECTED",socket.id);
    });

});

server.listen(3000,()=>{
    console.log("SERVER RUNNING");})