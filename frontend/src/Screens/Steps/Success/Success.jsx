import React from "react";
import style from "./Success.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import { useHistory } from "react-router-dom";

export default function Success(){
    const hist = useHistory();

    function next(){
        hist.push("/addphoto")
    }
    return(
        <>
            <Card title="yay!! account created successfully">
                <img src = "/Resources/Icons/popper.png" alt="icon" className = {style.cardPic}></img>
                <Button
                    text="Continue"
                    icon = {true}
                    onClick = {next}
                ></Button>
            </Card>
        </>
    )
}