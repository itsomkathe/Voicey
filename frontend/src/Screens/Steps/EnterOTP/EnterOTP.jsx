import React, { useState } from "react";
import style from "./EnterOTP.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
// import OTPInput from "../../../Components/Common/OTPInput/OTPInput";
import Input from "../../../Components/Common/Input/Input";
import { useHistory } from "react-router-dom";
import { verifyOTP } from "../../../Reqests/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setVerify } from "../../../Store/VerifySlice";

export default function EnterOTP({ onClick }) {
    const [OTP, setOTP] = useState(null);
    const [error, setError] = useState(null);
    const hist = useHistory();
    const dispatch = useDispatch();

    const { phone, hash } = useSelector((state) => {
        return state.verify.otp;
    });
    const verify = async () => {
        try {
            const res = await verifyOTP({ phone, hash, otp: OTP });
            if (res.data.error) {
                setError(res.data.error);
            } else {
                await dispatch(setVerify(true));
                hist.push("/authentication");
            }
        } catch (err) {
            setError("Error Occured");
        }
    };
    return (
        <>
            <div className={style.cardWrapper}>
                <Card title="enter OTP" icon="key.png">
                    <div className={style.OTPWrapper}>
                        <Input
                            onchange={(e) => {
                                setOTP(e.target.value);
                            }}
                            pattern="[0-9]"
                            placeholder="Enter OTP"
                            type="number"
                            value={OTP}
                        />
                    </div>
                    {error ? (
                        <span className={style.warning}>{error}</span>
                    ) : null}
                    <span className={style.message}>
                        enter the code that we have just sent you
                    </span>
                    <Button
                        icon={true}
                        onClick={verify}
                        text="Continue"
                    ></Button>
                </Card>
            </div>
        </>
    );
}
