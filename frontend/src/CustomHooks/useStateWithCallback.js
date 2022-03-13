import { useCallback, useRef, useState, useEffect } from "react";

export default function useStateWithCallback(initialState){
    const[state, setState] = useState(initialState);
    const cbRef = useRef();

    //Will be imported as setState
    const updateState = useCallback((newState, cb)=>{
        cbRef.current = cb;
        setState((prev)=>{
            return typeof newState === 'function' ? newState(prev) : newState;
        })
    }, []);

    useEffect(()=>{
        if(typeof cbRef.current === 'function'){
            cbRef.current(state);
        }
        cbRef.current = null;
    }, [state])

    return [state, updateState];
}