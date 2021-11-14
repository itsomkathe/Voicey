import React, { useState, useEffect } from "react";
import style from "./Success.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";

export default function Success(){
    return(
        <>
            <Card title="yay!! account created successfully">
                <img src = "/Resources/Icons/popper.png" alt="icon" className = {style.cardPic}></img>
                <Button
                    text="Continue"
                    icon = {true}
                ></Button>
            </Card>
        </>
    )
}