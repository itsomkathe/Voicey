import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./SingleRoom.module.css";

export default function SingleRoom() {
    const { roomID } = useParams();
    const [clients, setClients] = useState([
        {
            id: 1,
            name: "Venugopal Iyer",
        },
        {
            id: 2,
            name: "Sean Paul",
        },
    ]);
    return (
        <>
            {clients.map((client) => {
                return (
                    <div key={client.id}>
                        <audio controls autoPlay></audio>
                        <h4>{client.name}</h4>
                    </div>
                );
            })}
        </>
    );
}
