import React, { useState } from "react";
import Email from "./Email";
import style from "./EnterPhoneMail.module.css";
import Phone from "./Phone";

const typeStep = {
    1: Phone,
    2: Email,
};
export default function EnterPhoneMail({ onClick }) {
    const [type, setType] = useState(1);
    const Comp = typeStep[type];

    return (
        <>
            <div className={style.cardWrapper}>
                <div className={style.buttonWrap}>
                    <button
                        id={type === 1 ?  style.phoneActive: null}
                        className={style.toggleButton}
                        onClick={() => {
                            setType(1);
                        }}
                    >
                        <img src = "/Resources/Icons/smartphone.svg" alt = "icon"></img>
                    </button>
                    <button
                        id={type === 2 ?  style.mailActive: null}
                        className={style.toggleButton}
                        onClick={() => {
                            setType(2);
                        }}
                    >
                        <img src = "/Resources/Icons/email-dark.svg" alt = "icon"></img>
                    </button>
                </div>
                <Comp onClick={onClick} />
            </div>
        </>
    );
}
