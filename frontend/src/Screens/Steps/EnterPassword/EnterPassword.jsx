import React, { useEffect, useState } from "react";
import style from "./EnterPassword.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalPassword } from "../../../Store/AuthSlice";

export default function EnterPassword({ onClick }) {
    const [password, setPassword] = useState(null);
    const [allow, setAllow] = useState(false);
    const dispatch = useDispatch();
    const globalPassword = useSelector((state) => {
        return state.auth.password;
    });

    useEffect(() => {
        if (globalPassword) {
            setPassword(globalPassword);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (password) {
            if (password.length >= 6) {
                setAllow(true);
            } else {
                setAllow(false);
            }
        } else {
            setAllow(false);
        }
    }, [password]);

    async function next() {
        await dispatch(setGlobalPassword(password));
        onClick();
    }
    return (
        <>
            <Card title="enter password" icon="lockkey.png">
                <div className={style.inputWrapper}>
                    <Input
                        onchange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="set password"
                        type="password"
                        value={password}
                    />
                </div>
                {/*<span className = {style.warning}>invalid input</span>*/}
                <span className={style.message}>
                    password should consist at least 6 characters
                </span>
                <Button
                    icon={true}
                    disabled={!allow}
                    onClick={next}
                    text="Continue"
                ></Button>
            </Card>
        </>
    );
}
