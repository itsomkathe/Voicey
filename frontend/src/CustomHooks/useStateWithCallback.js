import { useCallback, useEffect, useRef, useState } from "react";

export function useStateWithCallback(initialState) {
    const [state, setState] = useState(initialState);
    const callbackRef = useRef();

    const updateState = useCallback(
        (newState, callback) => {
            callbackRef.current = callback;
            setState((prev) => {
                return typeof newState === "function"
                    ? newState(prev)
                    : newState;
            });
        }, []
    );
    
    useEffect(()=>{
        if(callbackRef.current){
            callbackRef.current(state)
            callbackRef.current = null;
        }
    }, [state])

    return[state, updateState];
}
