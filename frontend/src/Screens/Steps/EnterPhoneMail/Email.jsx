import React from "react";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import Input from "../../../Components/Common/Input/Input";
import style from "./Email.module.css"

export default function Email({onClick}){
    return (
        <>
            <Card title = "enter email" icon = "email.svg">
                <div className = {style.inputWrapper}>
                    <Input placeholder="voicey@sample.com" type="text"/>
                </div>
                {/* <span className = {style.warning}>invalid input</span> */}
                <Button onClick = {onClick} text ="Continue"/>
                <p className = {style.terms}>by entering your phone number you are agreeing to our terms of sevice and privacy policy</p>
            </Card>
        </>
    )
}