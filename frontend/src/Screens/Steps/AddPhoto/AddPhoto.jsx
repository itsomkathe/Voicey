import React, { useEffect, useState, useRef } from "react";
import style from "./AddPhoto.module.css";
import Button from "../../../Components/Common/Button/Button";
import Card from "../../../Components/Common/Card/Card";
import { useSelector } from "react-redux";
import { addPhoto } from "../../../Reqests/axios";
async function createFile(img) {
    try {
        let response = await fetch(img);
        let data = await response.blob();
        let metadata = {
            type: "image",
        };
        let file = new File([data], "samplepic.jpg", metadata);
        return file;
    } catch (err) {
        return new Error(err.message);
    }
}
export default function AddPhoto() {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('')
    const [didMount, setDidMount] = useState(false);
    const [picID, setPicID] = useState(1);
    const { name, picture } = useSelector((state)=>{
        return state.profile;
    });
    const firstRender = useRef(true);
    const inputRef = useRef();

    useEffect(()=>{
        if(!firstRender.current){
            createFile(`/Resources/Avatars/${picID}.jpg`).then((file)=>{
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[picID])

    useEffect(() => {
        setDidMount(true);
        firstRender.current = false;
        document.title = "Profile Picture";
        return () => {
            setDidMount(false);
        };
    }, []);

    useEffect(()=>{
        if(picture){
            setImage(picture);
        }else{
            createFile(`/Resources/Avatars/${picID}.jpg`).then((file)=>{
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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

    const submit = async ()=>{
        try{
            const {data} = await addPhoto({picture: image});
            console.log(data);
        }catch(err){
            setError(err.response? err.response.data.error: "Error Occured");
        }
    }
    const newPicID = () => {
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
                        <img src={image} alt="pic"></img>
                    </div>

                    <span onClick={newPicID} id={style.generate}>
                        Generate an avatar
                    </span>
                    {error ? <span className={style.warning}>{error}</span> : null}

                    <div className={style.buttonWrapper}>
                        <Button
                            text="Upload"
                            onClick={handleUploadClick}
                            disabled={false}
                            color="WHITE"
                        />
                        <Button text="Save Picture" icon='right-arrow.svg' onClick = {submit}/>
                    </div>

                    <input
                        type="file"
                        className={style.fileInput}
                        ref={inputRef}
                        accept="image/*"
                        onChange={displayImage}
                    ></input>
                </Card>
            </div>
        </>
    );
}
