import React from "react";
import style from "./Button.module.css";

export default function Button({text, onClick}){
    return(
        <>
            <button onClick={onClick? onClick:null} id = {style.button}>
                        <span>{text}</span>
                        <img src = "/Resources/Icons/right-arrow.svg" alt = "icon"></img>
            </button>
        </>
    )
}