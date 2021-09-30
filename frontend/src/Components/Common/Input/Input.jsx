import React from "react";
import style from "./Input.module.css";

export default function Input({ type, placeholder, onchange, pattern }) {
    return (
        <>
            <input
                onChange={onchange}
                placeholder={placeholder}
                type={type}
                className={style.input}
                pattern = {pattern}
            ></input>
        </>
    );
}