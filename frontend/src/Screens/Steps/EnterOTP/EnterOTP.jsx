import React from "react";
import style from './EnterOTP.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";

export default function EnterOTP({onclick}){
    return(
        <>
            <Card title = "enter OTP" icon = "key.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}