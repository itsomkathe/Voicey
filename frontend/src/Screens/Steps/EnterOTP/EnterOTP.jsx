import React from "react";
import style from './EnterOTP.module.css'
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import OTPInput from "../../../Components/Common/OTPInput/OTPInput";
import {useHistory} from "react-router-dom";


export default function EnterOTP({onClick}){
    const hist = useHistory();
    const redirectRegister = ()=>{
        hist.push("/authentication");
    }
    return(
        <>
            <div className={style.cardWrapper}>
                <Card title = "enter OTP" icon = "key.svg">
                    <div className = {style.OTPWrapper}>
                        <OTPInput/>
                    </div>
                    <span className = {style.message}>enter the code that we have just sent you</span>
                    <Button onClick = {redirectRegister} text = "Continue"></Button>
                </Card>
            </div>
        </>
    )
}