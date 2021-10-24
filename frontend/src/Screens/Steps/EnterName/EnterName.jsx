import React, { useEffect, useState } from "react";
import style from "./EnterName.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalName } from "../../../Store/AuthSlice";

export default function EnterName({ onClick }) {
    const [name, setName] = useState(null);
    const dispatch = useDispatch();
    const globalName = useSelector((state)=>{return state.auth.name});

    useEffect(()=>{
        if(globalName){
            setName(globalName);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function next() {
        await dispatch(setGlobalName(name));
    }
    return (
        <>
            <Card title="enter profile name" icon="nerd.svg">
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
                <Button
                    disabled={name ? false : true}
                    onClick={next}
                    text="Continue"
                    value = {name}
                ></Button>
            </Card>
        </>
    );
}
