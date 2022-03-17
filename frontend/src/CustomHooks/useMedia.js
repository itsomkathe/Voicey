import { useState, useRef, useEffect, useCallback } from "react";
import { socketInit } from "../Socket";
import useStateWithCallback from "./useStateWithCallback";
import { ACTIONS } from "../Socket/actions";
import freeice from 'freeice';

export default function useMedia(roomId, user) {
    const [clients, setClients] = useStateWithCallback([]);
    //Referencing all audio elements like userId: ref
    const audioElements = useRef({});
    //Referencing peer connections with socket
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = socketInit();
    }, []);

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );
            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );

    // <---------- CAPTURING AUDIO ---------->

    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
        };

        startCapture().then(() => {
            addNewClient(user, () => {
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
            });
            socket.current.emit(ACTIONS.JOIN, {roomId, user});
        });

        return ()=>{
            //<--------- LEAVING ROOM --------->
            localMediaStream.current.getTracks()
            .forEach(track => track.stop());

            socket.current.emit(ACTIONS.LEAVE, {roomId});
        }
    }, []);

    useEffect(()=>{
        const handleNewPeer = async ({peerId, createOffer, user: remoteUser})=>{
            //If already connected warning
            if(peerId in connections.current){
                return console.warn(`You are already connected`)
            }

            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice()
            });
            //Handle new ice candidate 
            connections.current[peerId].onicecandidate = (event)=>{
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate
                });
            };

            connections.current[peerId].ontrack = ({
                streams: [remoteStream]
            })=>{
                addNewClient(remoteUser, ()=>{
                    if(audioElements.current[remoteUser.id]){
                        audioElements.current[remoteUser.id].srcObject = remoteStream;
                    }else{
                        let setteled = false;
                        const interval = setInterval(()=>{
                            if(audioElements.current[remoteUser.id]){
                                audioElements.current[remoteUser.id].srcObject = remoteStream;
                                setteled = true;
                            }
                            if(setteled){
                                clearInterval(interval);
                            }
                        }, 1000)
                    }
                })
            }

            //Add local track to remote connections
            localMediaStream.current.getTracks().forEach((track)=>{
                connections.current[peerId].addTrack(track, localMediaStream.current);
            });

            //Create offer
            if(createOffer){
                const offer = await connections.current[peerId].createOffer();
                await connections.current[peerId].setLocalDescription(offer);
                //Send offer to another client
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId, 
                    sessionDescription: offer
                });
            }
        }
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

        return ()=>{
            socket.current.off(ACTIONS.ADD_PEER, handleNewPeer);
        }
    }, []);


    //<---------- RELAY ICE ---------->
    useEffect(()=>{
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({peerId, icecandidate})=>{
            if(icecandidate){
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return ()=>{
            socket.current.off(ACTIONS.RELAY_ICE);
        }
    }, [])
    
    //<---------- RELAY SDP ---------->

    useEffect(()=>{
        const handleRemoteSDP = async ({peerId, sessionDescription: remoteSessionDescription})=>{
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            );

            if(remoteSessionDescription.type === 'offer'){
                const connection = connections.current[peerId];
                const answer = await connection.createAnswer();

                connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer
                });
            }
        }
        socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSDP);

        return ()=>{
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        }
    }, []);

    //<---------- REMOVE PEER ---------->

    useEffect(()=>{
        const handleRemovePeer = async ({peerId, userId})=>{
            if(connections.current[peerId]){
                connections.current[peerId].close();
            }

            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients(list=> list.filter(client=> client.id !== userId));
        }
        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return ()=>{
            socket.current.off(ACTIONS.REMOVE_PEER);
        }
    }, [])

    return {
        clients,
        setClients,
        provideRef,
    };
}
