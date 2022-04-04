import React, { useState } from 'react';
import styles from './RoomModal.module.css';
import { useHistory } from 'react-router-dom';
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import { createRoom } from '../../Reqests/axios';

const RoomModal = ({ onClose }) => {
    const history = useHistory();

    const [roomType, setRoomType] = useState('open');
    const [error, setError] = useState('');
    const [topic, setTopic] = useState('');
    const [allow, setAllow] = useState(false);
    async function create() {
        try {
            if (!topic) return;
            const { data } = await createRoom({ topic, roomType });
            history.push(`/room/${data._id}`);
        } catch (err) {
            setError(err.response.data.error ? err.response.data.error : "Error Occured" );
        }
    }

    function inputChange(event){
        setTopic(event.target.value);
        if(event.target.value){
            setAllow(true);
        }else{
            setAllow(false);
        }
    }
    
    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/Resources/Icons/cross.svg" alt="close" />
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>
                        enter the topic to be disscussed
                    </h3>
                    <Input
                        onchange={inputChange}
                        value={topic}
                    ></Input>
                    <h2 className={styles.subHeading}>room types</h2>
                    <div className={styles.roomTypes}>
                        <div
                            onClick={() => setRoomType('open')}
                            className={`${styles.typeBox} ${
                                roomType === 'open' ? styles.active : ''
                            }`}
                        >
                            <img src="/Resources/Icons/globe.png" alt="globe" />
                            <span>open</span>
                        </div>
                        <div
                            onClick={() => setRoomType('social')}
                            className={`${styles.typeBox} ${
                                roomType === 'social' ? styles.active : ''
                            }`}
                        >
                            <img src="/Resources/Icons/social.png" alt="social" />
                            <span>social</span>
                        </div>
                        <div
                            onClick={() => setRoomType('private')}
                            className={`${styles.typeBox} ${
                                roomType === 'private' ? styles.active : ''
                            }`}
                        >
                            <img src="/Resources/Icons/lock.png" alt="lock" />
                            <span>private</span>
                        </div>
                    </div>
                    {
                        error ? <span className={styles.warning}>error occured</span> : null
                    }
                </div>
                <div className={styles.modalFooter}>
                    <h2>start a room</h2>
                    <Button
                        text= "Create"
                        icon='right-arrow.svg'
                        onClick={create}
                        disabled={!allow}
                    />
                </div>
            </div>
        </div>
    );
};

export default RoomModal;