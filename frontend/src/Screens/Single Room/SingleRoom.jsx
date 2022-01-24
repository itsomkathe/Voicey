import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMedia } from "../../CustomHooks/useMedia";
import style from "./SingleRoom.module.css";

export default function SingleRoom() {
    const { roomID } = useParams();
    const user = useSelector((state)=>state.profile);
    const [clients, provideRef] = useMedia(roomID, user);

    
    return (
        <>
            {clients.map((client) => {
                return (
                    <div key={client._id}>
                        <audio 
                            ref = {(instance)=>{
                                provideRef(instance, client._id)
                            }}
                            controls 
                            autoPlay></audio>
                        <h4>{client.name}</h4>
                    </div>
                );
            })}
        </>
    );
}
