import React, { useState } from 'react';
import RoomCard from '../../Components/Common/RoomCard/RoomCard';
import style from "./Rooms.module.css";

const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/Resources/Avatars/1.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/Resources/Avatars/2.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/Resources/Avatars/4.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar:'/Resources/Avatars/3.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/Resources/Avatars/1.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/Resources/Avatars/1.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar:'/Resources/Avatars/2.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/Resources/Avatars/5.jpg',
            },
        ],
        totalPeople: 40,
    },
];

const Rooms = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="container">
                <div className={style.roomsHeader}>
                    <div className={style.left}>
                        <span className={style.heading}>all voice rooms</span>
                        <div className={style.searchBox}>
                            <img src='/Resources/Icons/search.svg' className = {style.searchicon} alt="search" />
                            <input type="text" className={style.searchInput} />
                        </div>
                    </div>
                    <div className={style.right}>
                        <button
                            className={style.startRoomButton}
                        >
                            <img
                                src="/Resources/Icons/sound.svg"
                                alt="add-room"
                            />
                            Create Room
                        </button>
                    </div>
                </div>
                <div className={style.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Rooms;