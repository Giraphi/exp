import React, {useCallback, useEffect, useRef} from "react";
import MousePositionContext from "../mouse-position-context";
import useDevice from "../../hooks/use-device";

export interface MousePositionContextProviderProps {
    children: React.ReactNode;
}

export default function MousePositionContextProvider(props: MousePositionContextProviderProps) {
    const mousePositionRef = useRef<{x: number, y: number} | undefined>(undefined);
    const lastDocumentScrollY = useRef(0);
    const device = useDevice();

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (device === "small") {
                return;
            }
            mousePositionRef.current = {x: e.pageX, y: e.pageY};
        }

        function onTouchStart(e: TouchEvent) {
            mousePositionRef.current = {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            };
        }

        function onScroll() {
            if (device === "small") {
                return;
            }
            const deltaY = window.scrollY - lastDocumentScrollY.current
            if (deltaY === 0) {
                return;
            }

            if (!mousePositionRef.current) {
                return;
            }

            mousePositionRef.current = {
                x: mousePositionRef.current.x,
                y: mousePositionRef.current.y + deltaY,
            }
            lastDocumentScrollY.current = window.scrollY;
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("touchstart", onTouchStart);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("touchstart", onTouchStart);
        }
    }, [device]);

    const invalidatePosition = useCallback(() => {
        mousePositionRef.current = undefined;
    }, []);

    return (
        <MousePositionContext.Provider value={{mousePositionRef, invalidatePosition}}>
            {props.children}
        </MousePositionContext.Provider>
    );
}