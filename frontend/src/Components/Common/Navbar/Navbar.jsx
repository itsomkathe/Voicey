import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import { useSelector } from "react-redux";

export default function Navbar(){
    const { name, picture, isAuth } = useSelector((state)=>{
        return state.profile;
    });
    return(
    <>
        <nav className = {`${style.navbar} container`}>
            <Link to = '/'>
                <img id = {`${style.logo}`} src = '/Resources/Icons/logo.png' alt = "logo"></img>
            </Link>
            {
                isAuth && 
                <div className={style.navRight}>
                <h3>{name}</h3>
                    <Link to="/">
                        <img
                            className={style.picture}
                            src={
                                picture ? picture: `/Resources/Avatars/1.jpg`
                            }
                            alt="avatar"
                        />
                    </Link>
                </div>
            }
            
        </nav>
    </>)
}