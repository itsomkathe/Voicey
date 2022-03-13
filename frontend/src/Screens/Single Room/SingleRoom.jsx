import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMedia from "../../CustomHooks/useMedia";
//import style from "./SingleRoom.module.css";

export default function SingleRoom() {
    const { roomId } = useParams();
    const user = useSelector((state) => state.profile);
    const { clients, provideRef } = useMedia(roomId, user);

    return (
        <>
            <div>
                {clients.map((client) => {
                    return (
                        <div key={client.id}>
                            <audio
                                ref={(instance) => provideRef(instance, client.id)}
                                controls={true}
                                autoPlay={true}
                            ></audio>
                            <h5>{client.name}</h5>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
