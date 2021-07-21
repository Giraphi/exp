import {useEffect, useRef} from "react";

export default function useMousePositionRef() {
    const mousePosition = useRef({x: 0, y: 0});

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            console.log(e);
            mousePosition.current = {x: e.clientX, y: e.clientY};
        }

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return mousePosition;
}