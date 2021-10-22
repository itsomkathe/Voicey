import React from "react";
import style from './EnterName.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";

export default function EnterName({onclick}){
    return(
        <>
            <div className={style.cardWrapper}>
                <Card title = "enter profile name" icon = "nerd.svg">
                    <div className = {style.inputWrapper}>
                        <Input placeholder = "Enter your name"/>
                    </div>
                    <Button onClick = {onclick} text = "Continue"></Button>
                </Card>
            </div>  
        </>
    )
}