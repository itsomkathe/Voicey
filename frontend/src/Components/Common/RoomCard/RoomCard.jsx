import React from 'react';
import style from './RoomCard.module.css';
import { useHistory } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const history = useHistory();
    return (
        <div
            onClick={() => {
                history.push(`/room/${room.id}`);
            }}
            className={style.card}
        >
            <h3 className={style.topic}>{room.topic}</h3>
            <div
                className={`${style.speakers} ${
                    room.speakers.length === 1 ? style.singleSpeaker : ''
                }`}
            >
                <div className={style.avatars}>
                    {room.speakers.map((speaker) => (
                        <img
                            key={speaker.id}
                            src={speaker.avatar}
                            alt="speaker-avatar"
                        />
                    ))}
                </div>
                <div className={style.names}>
                    {room.speakers.map((speaker) => (
                        <div key={speaker.id} className={style.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img
                                src="/Resources/Icons/online-dot.png"
                                alt="chat-bubble"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/Resources/Icons/person.svg" alt="user-icon" />
            </div>
        </div>
    );
};

export default RoomCard;