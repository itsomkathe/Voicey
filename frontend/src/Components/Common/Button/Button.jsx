import React from "react";
import style from "./Button.module.css";
export default function Button({ text, onClick, disabled }) {
    return (
        <>
            <button
                onClick={onClick ? onClick : null}
                className = {style.button}
                disabled = {disabled}
                id = {style.buttonBlue}
            >
                <span>{text}</span>
                <img src="/Resources/Icons/right-arrow.svg" alt="icon"></img>
            </button>
        </>
    );
}
