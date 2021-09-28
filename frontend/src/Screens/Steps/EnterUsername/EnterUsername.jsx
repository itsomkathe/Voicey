import React from "react";
import style from './EnterUsername.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";

export default function EnterUsername({onclick}){
    return(
        <>
            <Card title = "enter username" icon = "glasses.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}