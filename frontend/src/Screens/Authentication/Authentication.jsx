import React, {useState} from "react";
import EnterOTP from "../Steps/EnterOTP/EnterOTP";
import EnterPassword from "../Steps/EnterPassword/EnterPassword";
import EnterPhoneMail from "../Steps/EnterPhoneMail/EnterPhoneMail";
import EnterUsername from "../Steps/EnterUsername/EnterUsername";

const authSteps = {
    1: EnterPhoneMail,
    2: EnterOTP,
    3: EnterUsername,
    4: EnterPassword,
}

export default function Authentication(){
    const[step, setStep] = useState(1);
    const Comp = authSteps[step];
    const nextStep = ()=>{
        setStep(step+1);
    }
    return(
        <>
            <Comp onclick = {nextStep}/>
        </>
    )
}