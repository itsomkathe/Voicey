import React, { useEffect, useState } from "react";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import style from "./Phone.module.css";

export default function Phone({ onClick }) {
    const[number, setNumber] = useState(null);
    const[allow, setAllow] = useState(false);

    useEffect(()=>{
        if(number){
            if(number.toString().length === 10){
                setAllow(true);
            }else{
                setAllow(false);
            }
        }
    }, [number])

    return (
        <>
            <Card title="enter phone number" icon="phone.svg">
                <div className={style.inputWrapper}>
                    <img src="/Resources/Icons/india.svg" alt="india" />
                    <Input
                        onchange={(e) => {
                            setNumber(e.target.value);
                        }}
                        pattern="[0-9]"
                        placeholder="10 digit phone number"
                        type="number"
                    />
                </div>
                {/*<span className={style.warning}>invalid input</span>*/}
                <Button disabled = {!allow} onClick={onClick} text="Continue" />
                <p className={style.terms}>
                    by entering your phone number you are agreeing to our terms
                    of sevice and privacy policy
                </p>
            </Card>
        </>
    );
}
