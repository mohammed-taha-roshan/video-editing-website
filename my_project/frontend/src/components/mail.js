import React,{useState,useEffect} from "react";
import GoogleLogin from "react-google-login";
import "./styling.css"
import {useNavigate} from "react-router-dom"
import { FaFacebookF,FaGoogle} from "react-icons/fa";
// import { useForm } from "react-hook-form";

const Mail = () => {
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => alert(JSON.stringify(data));

    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSucces = e => {
        alert("User signed in")
        console.log(e)
    }

    const onFailur = e => {
        alert("User sign in Failed")
        console.log(e)
    }

    const navigate=useNavigate();

    return (
        <div className="yo">
        <div className="page">
        <div className="cover">
            <h1 className="hi">Login</h1>
            <input type="email" placeholder="email" required/>
            <input type="password" placeholder="password" name="pass"  required/>

            <button className="login-btn" id="btn"  onClick={() => {
                            navigate("/profile")
                }}><h1 className="h11">Login</h1></button>

            <p className="text">Or login using</p>
            <div className="alt-login">
                <div className="Facebook"/>
                <div className="Google">
                    <GoogleLogin className="blue"
                    clientId="297256803099-1ibo34ksmi99pagc5otjhphemj300m8d.apps.googleusercontent.com"
                    buttonText=""
                    onSuccess={onSucces}
                    onFailure={onFailur}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    icon={false}
                    theme='dark' />
                </div>
            </div>
        </div>
        <div className={popupStyle}>
                <h3 className="hi">Login Failed</h3>
                <p>Username or password incorrect</p>
            </div>
        </div>
        </div>
    )
}


export default Mail