import React from "react";
import style from "./Signin.module.css";
import Button from "../../Components/Common/Button/Button";
import Card from "../../Components/Common/Card/Card";
import Input from "../../Components/Common/Input/Input";

export default function Signin(){
    
    return(
        <>
            <div className = {style.cardWrapper}>
                <Card title = "sign in" icon = "unlock.svg">
                    <div className = {style.inputWrapper}>
                        <Input placeholder = "username"/>
                        <Input type = "password" placeholder = "password"/>
                    </div>
                    <Button text = "Sign In"/>
                </Card>
            </div>
            
        </>
    )
}