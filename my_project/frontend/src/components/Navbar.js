import React from 'react'
import REACTLOGO from './images/react-logo.png'
export default function Navbar(){
    return(
        <nav>
            <img src={REACTLOGO} />
            <h1>React JS</h1>
        </nav>
    )
}