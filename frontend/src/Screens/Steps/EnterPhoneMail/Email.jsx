import React, { useEffect, useState } from "react";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import style from "./Email.module.css";

export default function Email({ onClick }) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    const [email, setEmail] = useState("");
    const [allow, setAllow] = useState(false);

    useEffect(() => {
        if (email) {
            if (regex.test(email)) {
                setAllow(true);
            } else {
                setAllow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    return (
        <>
            <Card title="enter email" icon="email.png">
                <div className={style.inputWrapper}>
                    <Input
                        onchange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="voicey@sample.com"
                        value={email}
                        type="text"
                    />
                </div>
                {/* <span className = {style.warning}>invalid input</span> */}
                <Button disabled = {!allow} onClick={onClick} text="Continue" />
                <p className={style.terms}>
                    by entering your email you are agreeing to our terms
                    of sevice and privacy policy
                </p>
            </Card>
        </>
    );
}
