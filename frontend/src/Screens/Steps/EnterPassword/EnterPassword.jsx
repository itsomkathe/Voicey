import React from "react";
import style from './EnterPassword.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";

export default function EnterPassword({onclick}){
    return(
        <>
            <Card title = "enter password" icon = "lockkey.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}