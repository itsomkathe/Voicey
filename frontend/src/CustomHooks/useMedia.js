import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from '../Socket/index.js';
import { ACTIONS } from '../Socket/actions.js';

export function useMedia(roomID, user){
    const [clients, setClients] = useStateWithCallback([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);

    useEffect(()=>{
        socket.current = socketInit();
    }, [])
    
    const provideRef = (instance, userID)=>{
        audioElements.current[userID] = instance;
    }

    const addNewClient = useCallback((newClient, callBack)=>{
        const clientCheck = clients.find((client)=>client._id === newClient._id);
        
        if(clientCheck === undefined){
            setClients((existingClients)=> [...existingClients, newClient], callBack);
        }
    }, [clients, setClients])

    //Capturing Mic Audio
    useEffect(()=>{
        const startCapture = async ()=>{
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
        }

        startCapture()
        .then(()=>{
            addNewClient(user, ()=>{
                const localElement = audioElements.current[user._id];
                if(localElement){
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                socket.current.emit(ACTIONS.JOIN, {roomID, user})
            })
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, addNewClient])
    return [ clients, provideRef ]
}