const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

const mongoUrl = "mongodb+srv://rock:MTRoshan@cluster0.vq1pauv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connected to database"); })

    .catch((e) => { console.log(e); })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


app.post("/signin", (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    // find one checks whether the the email is already present or not
    User.findOne({email:email},(err,user)=>{
        // console.log(req.body);
            if(user){
                if(password === user.password){
                    res.send({message:"login successfully",user:user})
                }
                else{
                    res.send({message:"Password didn't match"})
                }
            }
            else{
                res.send({message:"User hasn't registered"})
    }
    })
})

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({email:email},(err,user)=>{
    console.log(req.body);
        if(user){
            res.send({message:"user is already registered"})
        }
        else{
    const user = new User({
        name,
        email,
        password
    })
    user.save(err => {
        if (err) {
            res.send(err)
        }
        else {
            res.send({ message: "successfully registered,Please login now" })
        }
    })
    }
    })
})
app.listen(9002, () => {
    console.log("server stated");
})