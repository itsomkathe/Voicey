import React, { useState } from "react";
import style from "./EnterName.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalName } from "../../../Store/AuthSlice";
import { createAccount } from "../../../Reqests/axios";
export default function EnterName({ onClick }) {
    const [name, setName] = useState(null);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const {username, password} = useSelector((state)=>{return state.auth});
    const {phone} = useSelector((state)=>{return state.verify.otp});
    
    async function next() {
        await dispatch(setGlobalName(name));
        try{
            const res = await createAccount({phone, username, password, name});
            console.log(res);
            onClick();
        }catch(err){
            setError(err.response.data.error);
        }
    }
    return (
        <>
            <Card title="enter profile name" icon="nerd.png">
                <div className={style.inputWrapper}>
                    <Input
                        onchange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder="Enter your name"
                        type="text"
                        value={name}
                    />
                </div>
                {error ? (
                        <span className={style.warning}>{error}</span>
                ) : null}
                <Button
                    disabled={name ? false : true}
                    onClick={next}
                    text="Continue"
                    value = {name}
                    icon = {true}
                ></Button>
            </Card>
        </>
    );
}
