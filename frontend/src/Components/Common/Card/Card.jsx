import React from "react";
import style from "./Card.module.css";

export default function Card({title, icon, children}){
    return <>
            <div className = {style.cardWrapper}>
                <div className = {style.card}>
                    <div className = {style.headerWrapper}>
                        <img src = {`/Resources/Icons/${icon}`} alt = "icon"/>
                        <h1>{title}</h1>
                    </div>
                    {children}
                </div>
            </div>
    </>;
}