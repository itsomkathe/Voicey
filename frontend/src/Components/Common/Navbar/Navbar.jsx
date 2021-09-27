import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
export default function Navbar(){
    return(
    <>
        <nav className = {`${style.navbar} container`}>
            <Link>
                <img id = {`${style.logo}`} src = '/Resources/Icons/logo.png' alt = "logo"></img>
            </Link>
        </nav>
    </>)
}