import React, {useState} from "react";
import EnterName from "../Steps/EnterName/EnterName";
import EnterPic from "../Steps/EnterPic/EnterPic";

const customStep = {
    1: EnterName,
    2: EnterPic
}

export default function Customize(){
    const[step, setStep] = useState(1);
    const Comp = customStep[step];
    const nextStep = ()=>{
        setStep(step+1);
    }
    return(
        <>
            <Comp onclick = {nextStep}/>
        </>
    )
}