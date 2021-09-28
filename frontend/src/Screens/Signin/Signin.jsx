import React from "react";
import style from "./Signin.module.css";
import Button from "../../Components/Common/Button/Button";
import Card from "../../Components/Common/Card/Card";

export default function Signin(){
    
    return(
        <>
            <Card title = "sign in" icon = "unlock.svg">
                <input  placeholder = "username" className = {style.input}/>
                <input  type = "password" placeholder = "password" className = {style.input}/>
                <Button text = "Sign In"/>
            </Card>
        </>
    )
}