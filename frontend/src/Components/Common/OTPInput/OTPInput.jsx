import React, { useRef, useEffect, useState } from "react";
import style from "./OTPInput.module.css";

export default function OTPInput() {
    

    return (
        <>
            <div className={style.inputWrapper}>
                <input maxLength="1" type="number" />
                <input maxLength="1" type="number" />
                <input maxLength="1" type="number" />
                <input maxLength="1" type="number" />
            </div>
        </>
    );
}
