import React from "react";
import {Link, useHistory} from "react-router-dom";
import Button from "../../Components/Common/Button/Button.jsx";
import Card from "../../Components/Common/Card/Card";
import style from "./Intro.module.css";

export default function Intro() {
    const hist = useHistory();
    const redirectRegister = ()=>{
        hist.push("/signup")
    }
    return <>
            <Card title = "hello, this is voicey" icon = "voice.png">
                <div className = {style.card}>
                    <p className = {style.text}>
                    make voice rooms, join them, connect with people. Make voice rooms, join them, connect with people. Make voice rooms, join them, connect with people.
                    </p>
                    <Button onClick = {redirectRegister} text = "Create Account"/>
                    <div className = {style.bottom}>
                        <span>already have an account?</span>
                        <Link to = "/signin">
                            Sign In
                        </Link>
                    </div>
                </div>
            </Card>
    </>;
}
