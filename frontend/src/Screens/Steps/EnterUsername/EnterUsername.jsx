import React, { useState, useEffect } from "react";
import style from "./EnterUsername.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import { setGlobalUsername } from "../../../Store/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function EnterUsername({ onClick }) {
    const [username, setUsername] = useState(null);
    const [allow, setAllow] = useState(false);
    const dispatch = useDispatch();
    const globalUsername = useSelector((state) => {
        return state.auth.username;
    });

    useEffect(() => {
        if (globalUsername) {
            setUsername(globalUsername);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (username) {
            if (username.length >= 3) {
                setAllow(true);
            } else {
                setAllow(false);
            }
        } else {
            setAllow(false);
        }
    }, [username]);

    async function next() {
        await dispatch(setGlobalUsername(username));
        onClick();
    }
    return (
        <>
            <Card title="enter username" icon="sunglasses.png">
                <div className={style.inputWrapper}>
                    <Input
                        onchange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="@username"
                        type="text"
                        value={username}
                    />
                </div>
                {/* <span className = {style.warning}>invalid input</span> */}
                <span className={style.message}>
                    username should consist at least 3 characters
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
