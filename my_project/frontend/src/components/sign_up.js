import React, {useState} from "react"
import "./sign.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const val=require("validator");

const Register = () =>{
    const navigate = useNavigate();
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })//keeping the value in password like each letter in user creating a dict
    }
    const reg = () =>{
        const { name, email, password, reEnterPassword } = user;
        if( name && email && val.isEmail(email) && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/signup", user)
            .then( res =>
                {alert(res.data.message);
                navigate("/signin");}
            )
        } else {
            alert("invlid input")
        }
    }
    return(
        <div className="register1">
            {/* {console.log(user)} adding each name */}
            <div className="register_in">
        {/* {console.log("User", user)} */}
        <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange} ></input>
        <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password}  placeholder="Your Password" onChange={handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
        <div className="button" onClick={reg} >Register</div>
        <div>or</div>
        <div className="button" onClick={() => {
                    navigate("/signin")
                }}>Login</div>
        </div>
    </div>
    )
}

export default Register;