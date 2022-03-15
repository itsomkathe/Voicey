import React from "react";
import style from "./Button.module.css";
export default function Button({ text, onClick, disabled, color, icon, type }) {
    let id = style.buttonBlue;
    if(color === "GREEN"){
        id = style.buttonGreen;
    }else if(color === "WHITE"){
        id = style.buttonWhite;
    }else if(color === "RED"){
        id = style.buttonRed;
    }
    
    if(disabled){
        id = style.buttonDisabled;
    }
    return (
        <>
            <button
                onClick={onClick ? onClick : null}
                className = {style.button}
                disabled = {disabled}
                id = {id}
                type = {type ? type : null}
            >
                <span>{text}</span>
                {icon ? <img src={`/Resources/Icons/${icon}`} alt="icon"></img> : null}
            </button>
        </>
    );
}
