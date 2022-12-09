import React, {useState} from "react"
import "./sign.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({setLoginUser}) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/signin", user)
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            //keeping the user data in setLoginUser
            navigate("/")
        })
    }

    return (
        <div className="login1">
            {console.log(user)}
            <div className="login_in">
            <h1>Login</h1>
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" required></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" required></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => {
                    navigate("/signup")
                }}>Register</div>
            </div>
        </div>
    )
}

export default Login