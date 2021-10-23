import React from "react";
import style from './EnterUsername.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";

export default function EnterUsername({onClick}){
    return(
        <>
                <Card title = "enter username" icon = "glasses.svg">
                    <div className = {style.inputWrapper}>
                        <Input placeholder = "@username"/>
                    </div>
                    {/* <span className = {style.warning}>invalid input</span> */}
                    <Button onClick = {onClick} text = "Continue"></Button>
                </Card>
        </>
    )
}