import React from "react";
import style from './EnterPassword.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";

export default function EnterPassword({onClick}){
    return(
        <>
                <Card title = "enter password" icon = "lockkey.svg">
                    <div className={style.inputWrapper}>
                        <Input placeholder = "set password" type = "password"/>
                    </div>
                    {/*<span className = {style.warning}>invalid input</span>*/}
                    <Button onClick = {onClick} text = "Continue"></Button>
                </Card>
        </>
    )
}