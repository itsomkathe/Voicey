import React, { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

export function useMedia(){
    const [clients, setClients] = useStateWithCallback([]);

    return { clients }
}