import React, {useState} from "react";
import EnterUsername from "../Steps/EnterUsername/EnterUsername";
import EnterPassword from "../Steps/EnterPassword/EnterPassword";
import EnterName from "../Steps/EnterName/EnterName";
import style from "./Authentication.module.css";

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
    const stepBack = ()=>{
        setStep(step-1);
    }
    return(
        <>
            <div className = {style.cardWrapper}>
                {
                    step > 1 ? <button onClick = {stepBack} className = {style.backButton}>
                                    <img src="/Resources/Icons/back.svg" alt = "icon"></img>
                                </button>: null
                }
                <Comp id = {style.card} onClick = {nextStep}/>
            </div>
        </>
    )
}