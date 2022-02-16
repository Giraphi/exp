import React, {useCallback, useEffect, useRef} from "react";
import MousePositionContext from "../mouse-position-context";
import useDevice from "../../hooks/use-device";
import {useMotionValue} from "framer-motion";

export interface MousePositionContextProviderProps {
    children: React.ReactNode;
}

export interface MousePosition {
    x: number,
    y: number;
    clientX: number;
    clientY: number;
}

export default function MousePositionContextProvider(props: MousePositionContextProviderProps) {
    const mousePositionRef = useRef<MousePosition | undefined>(undefined);
    const mousePositionMotionValue = useMotionValue<MousePosition | undefined>(undefined);
    const lastDocumentScrollY = useRef(0);
    const device = useDevice();

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (device === "small") {
                return;
            }

            const mousePosition = {
                x: e.pageX,
                y: e.pageY,
                clientX: e.clientX,
                clientY: e.clientY
            };

            mousePositionRef.current = mousePosition
            mousePositionMotionValue.set(mousePosition)
        }

        function onTouchStart(e: TouchEvent) {
            const mousePosition = {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY,
                clientX: e.targetTouches[0].clientX,
                clientY: e.targetTouches[0].clientY,
            }

            mousePositionRef.current = mousePosition
            mousePositionMotionValue.set(mousePosition)
        }

        function onScroll() {
            if (device === "small") {
                return;
            }
            const deltaY = window.scrollY - lastDocumentScrollY.current;
            if (deltaY === 0) {
                return;
            }

            if (!mousePositionRef.current) {
                return;
            }

            const mousePosition = {
                x: mousePositionRef.current.x,
                y: mousePositionRef.current.y + deltaY,
                clientX: mousePositionRef.current.clientX,
                clientY: mousePositionRef.current.clientY
            };
            mousePositionRef.current = mousePosition;
            mousePositionMotionValue.set(mousePosition)
            lastDocumentScrollY.current = window.scrollY;
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("scroll", onScroll);
        window.addEventListener("touchstart", onTouchStart);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("touchstart", onTouchStart);
        };
    }, [device, mousePositionMotionValue]);

    const invalidatePosition = useCallback(() => {
        mousePositionRef.current = undefined;
        mousePositionMotionValue.set(undefined);
    }, [mousePositionMotionValue]);

    return <MousePositionContext.Provider value={{mousePositionRef, invalidatePosition, mousePositionMotionValue}}>{props.children}</MousePositionContext.Provider>;
}
