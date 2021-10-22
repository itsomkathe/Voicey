import React, {useState} from "react";
import EnterUsername from "../Steps/EnterUsername/EnterUsername";
import EnterPassword from "../Steps/EnterPassword/EnterPassword";
import EnterName from "../Steps/EnterName/EnterName";
const Steps = {
    1: EnterUsername,
    2: EnterPassword,
    3: EnterName
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