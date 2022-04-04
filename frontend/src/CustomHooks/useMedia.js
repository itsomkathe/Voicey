import { useRef, useEffect, useCallback } from "react";
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
    const clientsRef = useRef([]);

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
            addNewClient({...user, muted: true}, () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                addNewClient({...remoteUser, muted: true}, ()=>{
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //<---------- HANDLE MUTE ---------->

    const handleMute = (isMute, userId)=>{
        let setteled = false;
        let interval = setInterval(()=>{
            if(localMediaStream.current){
                localMediaStream.current.getTracks()[0].enabled = !isMute;
                if(isMute){
                    socket.current.emit(ACTIONS.MUTE, {
                        roomId,
                        userId
                    });
                }else{
                    socket.current.emit(ACTIONS.UN_MUTE, {
                        roomId,
                        userId
                    });
                }
                setteled = true;
            }
            if(setteled){
                clearInterval(interval);
            }
        }, 200);
    }

    //<---------- LISTEN MUTE UNMUTE ---------->
    useEffect(()=>{
        clientsRef.current = clients;
    }, [clients])
    useEffect(()=>{
        socket.current.on(ACTIONS.MUTE, ({peerId, userId})=>{
            setMute(true, userId);
        });
        socket.current.on(ACTIONS.UN_MUTE, ({peerId, userId})=>{
            setMute(false, userId);
        });

        const setMute = (mute, userId)=>{
            const clientIdx = clientsRef.current.map((client)=>client.id).indexOf(userId);
            const connectedClients = JSON.parse(
                JSON.stringify(clientsRef.current)
            );
            if(clientIdx > -1){
                connectedClients[clientIdx].muted = mute;
                setClients(connectedClients);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        clients,
        setClients,
        provideRef,
        handleMute
    };
}
