import React, {useCallback, useEffect, useRef} from "react";
import MousePositionContext from "../mouse-position-context";

export interface MousePositionContextProviderProps {
    children: React.ReactNode;
}

export default function MousePositionContextProvider(props: MousePositionContextProviderProps) {
    const mousePositionRef = useRef<{x: number, y: number} | undefined>(undefined);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            mousePositionRef.current = {x: e.clientX, y: e.clientY};
        }

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    const invalidatePosition = useCallback(() => {
        mousePositionRef.current = undefined;
    }, []);

    return (
        <MousePositionContext.Provider value={{mousePositionRef, invalidatePosition}}>
            {props.children}
        </MousePositionContext.Provider>
    );
}