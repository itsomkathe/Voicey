import React from "react";
import style from './EnterOTP.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import OTPInput from "../../../Components/Common/OTPInput/OTPInput";

export default function EnterOTP({onClick}){
    return(
        <>
            <div className={style.cardWrapper}>
                <Card title = "enter OTP" icon = "key.svg">
                    <div className = {style.OTPWrapper}>
                        <OTPInput/>
                    </div>
                    <Button onClick = {onClick} text = "Continue"></Button>
                </Card>
            </div>
        </>
    )
}