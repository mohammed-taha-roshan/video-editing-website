import React from "react";
import { useState } from "react";
import "./start.css"
import { useNavigate } from "react-router-dom"
const Start = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="navb">
                <nav>
                    <img src={require('./images/video_edit2.png')} alt="" className="vid" />
                    <h1>Video Editing</h1>
                    {/* <img src={require('./images/profile.png')} alt="" className="prof" /><h2>Profile</h2> */}
                    <ul>
                        <li>
                            <a className="abt">Tools</a>
                        </li>
                        <li>
                            <a title="Hi Welcome to video editing website here you will be able to snip the videos which is free " className="abt">About Us?</a>
                        </li>
                    </ul>
                  <img src={require('./images/profile.png')} alt="" className="prof" /><h2>{}</h2>
                </nav>
                <div className="inside">
                    <font className="head">Video Editor</font>
                    <h1 className="head1">Upload a video and edit it in your computer</h1>
                    <button className="started" onClick={() => {
                        navigate("/upload")
                    }}   >Get started </button>

                </div>
            </div>
        </div>
    );
}
export default Start