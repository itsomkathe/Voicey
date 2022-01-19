import { useCallback, useRef, useState } from "react";

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
        }
    );

    return[state, updateState];
}
