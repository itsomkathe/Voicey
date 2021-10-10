import React, {useState} from "react";
import EnterOTP from "../Steps/EnterOTP/EnterOTP";
import EnterPhoneMail from "../Steps/EnterPhoneMail/EnterPhoneMail";

const Steps = {
    1: EnterPhoneMail,
    2: EnterOTP,
}

export default function Authentication(){
    const[step, setStep] = useState(1);
    const Comp = Steps[step];
    const nextStep = ()=>{
        setStep(step+1);
    }
    return(
        <>
            <Comp onClick = {nextStep}/>
        </>
    )
}