import React, { useRef, useEffect, useState } from "react";
import style from "./OTPInput.module.css";

export default function OTPInput() {
    const [OTP, setOTP] = useState(Array(4).fill(""));
    console.log(OTP);
    const handleChange = (element, index)=>{
        if(isNaN(element.value)) return false;

    }
    return (
        <>
            <div className={style.inputWrapper}>
                {OTP.map((data, index) => {
                    return <input 
                                maxLength="1" 
                                type="number" 
                                key={index} 
                                value={data} 
                                onChange = {e => handleChange(e.target, index)}
                            />;
                })}
            </div>
        </>
    );
}