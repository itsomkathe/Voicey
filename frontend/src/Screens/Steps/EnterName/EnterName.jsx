import React from "react";
import style from './EnterName.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";

export default function EnterName({onclick}){
    return(
        <>
            <Card title = "enter profile name" icon = "name.svg">
                <Button onClick = {onclick} text = "Continue"></Button>
            </Card>
        </>
    )
}