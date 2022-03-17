import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../Components/Common/Button/Button";
import useMedia from "../../CustomHooks/useMedia";
import style from "./SingleRoom.module.css";
import { getRoom } from "../../Reqests/axios";

export default function SingleRoom() {
    const history = useHistory();
    const { roomId } = useParams();
    const user = useSelector((state) => state.profile);
    const { clients, provideRef } = useMedia(roomId, user);
    const [room, setRoom] = useState(null);

    const handleManualLeave = () => {
        history.push("/rooms");
    };

    useEffect(()=>{
        const fetchRoom = async ()=>{
            const response = await getRoom(roomId);
            setRoom(response.data);
        }
        try{
            fetchRoom();
        }catch(err){
            console.log(err);
        }
    }, [roomId])
    return (
        <>
            <div className={style.clientWrapper}>
                <div className={style.header}>
                    <h2 className={style.topic}>
                        {room ? room.topic : null}
                    </h2>
                    <div className={style.actions}>
                        <button title="Wave hand!" className={style.waveButton}>
                            <img
                                src="/Resources/Icons/waving-hand.png"
                                alt="icon"
                            ></img>
                        </button>
                        <Button
                            text={"leave"}
                            onClick={handleManualLeave}
                            color="RED"
                        />
                    </div>
                </div>
                <div className={style.clientsList}>
                    {clients.map((client) => {
                        return (
                            <div key={client.id} className={style.client}>
                                <div className={style.userHead}>
                                    <audio
                                    ref={(instance) =>
                                        provideRef(instance, client.id)
                                    }
                                    controls={true}
                                    autoPlay={true}
                                ></audio>
                                    <img
                                        className={style.userPicture}
                                        src={client.picture}
                                        alt="userpic"
                                    ></img>
                                    <button className={style.micButton}>
                                        <img src="/Resources/Icons/mic-mute.png" alt="micicon"></img>
                                    </button>
                                </div>
                                <h5>{client.name}</h5>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
