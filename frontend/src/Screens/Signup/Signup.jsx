import React, {useState} from "react";
import EnterName from "../Steps/EnterName/EnterName";
import EnterOTP from "../Steps/EnterOTP/EnterOTP";
import EnterPassword from "../Steps/EnterPassword/EnterPassword";
import EnterPhoneMail from "../Steps/EnterPhoneMail/EnterPhoneMail";
import EnterPic from "../Steps/EnterPic/EnterPic";
import EnterUsername from "../Steps/EnterUsername/EnterUsername";

const signUpSteps = {
    1: EnterPhoneMail,
    2: EnterOTP,
    3: EnterUsername,
    4: EnterPassword,
    5: EnterName,
    6: EnterPic
}

export default function Signup(){
    const[step, setStep] = useState(1);
    const Comp = signUpSteps[step];
    const nextStep = ()=>{
        setStep(step+1);
    }
    return(
        <>
            <Comp onclick = {nextStep}/>
        </>
    )
}