import React, { useEffect, useState } from "react";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import style from "./Phone.module.css";
import { sendOTP } from "../../../Reqests/axios";
import { useDispatch } from "react-redux";
import { setOTP } from "../../../Store/VerifySlice";

export default function Phone({ onClick }) {
    const[number, setNumber] = useState(null);
    const[allow, setAllow] = useState(false);
    const[error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(number){
            if(number.toString().length === 10){
                setAllow(true);
            }else{
                setAllow(false);
            }
        }
    }, [number]);

    async function send(){
        try{
            // eslint-disable-next-line no-unused-vars
            const { data } = await sendOTP({phone: `+91${number}`});
            console.log(data);
            dispatch(setOTP({phone:data.phone, hash:data.hash}));
            onClick();
        }catch(err){
            setError(err.response.data.error ? err.response.data.error: "Error Occured");
        }
    }

    return (
        <>
            <Card title="enter phone number" icon="phone.png">
                <div className={style.inputWrapper}>
                    <img src="/Resources/Icons/india.svg" alt="india" />
                    <Input
                        onchange={(e) => {
                            setNumber(e.target.value);
                        }}
                        pattern="[0-9]"
                        placeholder="10 digit phone number"
                        type="number"
                        value={number}
                    />
                </div>
                {
                    error ? <span className={style.warning}>{error}</span> : null
                }
                <Button icon='right-arrow.svg'  disabled = {!allow} onClick={send} text="Continue" />
                <p className={style.terms}>
                    by entering your phone number you are agreeing to our terms
                    of sevice and privacy policy
                </p>
            </Card>
        </>
    );
}
