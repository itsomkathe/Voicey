import React, { useEffect, useState } from "react";
import style from "./AddPhoto.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddPhoto(){
    const globalName = "Om"
    return(
    <>
        <Card  title= {`alright ${globalName}, add a photo`} icon="camera.png">
            <Button
                text="Set Picture"
            />
            <span className = {style.message}>you can do this step later, <Link>Skip</Link></span>
        </Card>
    </>
    )
}