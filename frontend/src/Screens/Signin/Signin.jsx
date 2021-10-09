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
                    </div>
                    <div className = {style.inputWrapper}>
                        <Input placeholder = "password"/>
                    </div>
                    <div className = {style.buttonWrapper}>
                        <Button text = "Sign In"/>
                    </div>
                    <span className={style.message}>want to test this app? <span className = {style.clickHere}>Click Here</span></span>
                </Card>
            </div>
            
        </>
    )
}