import React from "react";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import style from './EnterPhoneMail.module.css'

export default function EnterPhoneMail({onclick}){
    return(
        <>
            <Card title = "phone number" icon = "phone.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}