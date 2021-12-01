import React, { useEffect, useState, useRef } from "react";
import style from "./AddPhoto.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AddPhoto() {
    const [image, setImage] = useState(null);
    const [didMount, setDidMount] = useState(false);
    const [picID, setPicID] = useState(1);
    const { name } = useSelector((state)=>{
        return state.profile;
    })
    const inputRef = useRef();
    useEffect(() => {
        setDidMount(true);
        document.title = "Profile Picture";
        return () => {
            setDidMount(false);
        };
    }, []);

    const handleUploadClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const displayImage = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (didMount) {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (didMount) {
                setImage(null);
            }
        }
    };

    const newPicID = () => {
        if(image){
            setImage(null);
        }
        setPicID((picID % 5) + 1);
    };

    return (
        <>
            <div className={style.cardWrapper}>
                <Card
                    title={`alright ${name}, add a photo`}
                    icon="camera.png"
                >
                    <div className={style.picWrapper}>
                        {image ? (
                            <img src={image} alt="pic"></img>
                        ) : (
                            <img
                                src={`/Resources/Avatars/${picID}.jpg`}
                                alt="pic"
                            ></img>
                        )}
                    </div>

                    <span onClick={newPicID} id={style.generate}>
                        Generate an avatar
                    </span>

                    <div className={style.buttonWrapper}>
                        <Button
                            text="Upload"
                            onClick={handleUploadClick}
                            disabled={false}
                            color="WHITE"
                        />
                        <Button text="Save Picture" icon={true} />
                    </div>

                    <input
                        type="file"
                        className={style.fileInput}
                        ref={inputRef}
                        accept="image/*"
                        onChange={displayImage}
                    ></input>

                    <span className={style.message}>
                        you can do this step later, <Link to="/">Skip</Link>
                    </span>
                </Card>
            </div>
        </>
    );
}
