import React, {useState} from "react";
import Button from "../../Components/Common/Button/Button";
import Card from "../../Components/Common/Card/Card";

export default function Signin(){
    
    return(
        <>
            <Card title = "sign in" icon = "unlock.svg">
                <Button text = "Sign In"/>
            </Card>
        </>
    )
}