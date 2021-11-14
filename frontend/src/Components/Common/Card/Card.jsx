import React from "react";
import style from "./Card.module.css";

export default function Card({title, icon, children}){
    return <>
                <div className = {style.card}>
                    <div className = {style.headerWrapper}>
                        {icon ? <img src = {`/Resources/Icons/${icon}`} alt = "icon"/> : null}
                        <h1>{title}</h1>
                    </div>
                    {children}
                </div>
    </>;
}