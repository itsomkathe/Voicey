import React from "react";
import style from './EnterPic.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
export default function EnterPic({onclick}){
    return(
        <>
            <Card title = "add profile picture" icon = "photo.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}