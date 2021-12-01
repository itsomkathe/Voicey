import React, { useState, useEffect } from "react";
import style from "./Signin.module.css";
import Button from "../../Components/Common/Button/Button";
import Card from "../../Components/Common/Card/Card";
import Input from "../../Components/Common/Input/Input";
import { signIn } from "../../Reqests/axios";
import { setProfile, setIsAuth } from "../../Store/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [allow, setAllow] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const hist = useHistory();
    const { isAuth } = useSelector((state) => {
        return state.profile;
    });

    useEffect(()=>{
        if(username.length >= 3 && password.length >= 6){
            setAllow(true);
        }else{
            setAllow(false);
        }
    },[username, password]);

    useEffect(()=>{
        if(isAuth){
            hist.push("/rooms");
        }
    }, [isAuth, hist]);

    function changeUsername(event) {
        setUsername(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    async function submit(event) {
        event.preventDefault();
        try{
            let { data } = await signIn({
                username, 
                password
            });
            data.isAuth = true;
            dispatch(setProfile(data));
        }catch(err){
            setError(err.response.data.error ? err.response.data.error : "Error Occured" );
        }
    }
    return (
        <>
            <div className={style.cardWrapper}>
                <Card title="sign in" icon="unlock.svg">
                    <form className={style.form} onSubmit = {submit} >
                        <div className={style.inputWrapper}>
                            <Input
                                type="text"
                                value={username}
                                placeholder="username"
                                onchange={changeUsername}
                            />
                        </div>
                        <div className={style.inputWrapper}>
                            <Input
                                type="password"
                                value={password}
                                placeholder="password"
                                onchange={changePassword}
                            />
                        </div>
                        {error ? <span className={style.warning}>{error}</span> : null}
                        <div className={style.buttonWrapper}>
                            <Button
                                disabled={!allow}
                                type="submit"
                                text="Sign In"
                                icon = {true}
                            />
                        </div>
                    </form>
                    <span className={style.message}>
                        want to test this app?{" "}
                        <span className={style.clickHere}>Click Here</span>
                    </span>
                </Card>
            </div>
        </>
    );
}
