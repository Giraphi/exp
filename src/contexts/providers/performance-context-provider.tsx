import React, {useRef, useState} from "react";
import {PerformanceContext, Performances} from "../performance-context";
import {useFrame} from "@react-three/fiber";

export interface PerformanceContextProviderProps {
    children: React.ReactNode
}

export default function PerformanceContextProvider(props: PerformanceContextProviderProps) {
    const [performance, setPerformance] = useState<number>(Performances.high);
    // const [numSet, setNumSet] = useState(0);
    const [isSet, setIsSet] = useState(false);

    function setPerformanceByFps(fps: number) {
        if (fps < 25) {
            setPerformance(Performances.low)
            return;
        }
        if (fps < 50) {
            setPerformance(Performances.medium)
            return;
        }

        setPerformance(Performances.high)
    }

    const frameCounter = useRef(0);
    const fpsCounter = useRef(0);
    useFrame((state, delta) => {
        if (isSet) {
            return;
        }

        const fps = delta ? 1 / delta : 0;
        console.log(fps);
        frameCounter.current++;
        fpsCounter.current += fps;

        const averageFps = fpsCounter.current / frameCounter.current;

        if (frameCounter.current > 10) {
            console.log(averageFps);
            setPerformanceByFps(averageFps);
            setIsSet(true);
        }
    });

    return (
        <PerformanceContext.Provider value={{performance}}>
            {props.children}
        </PerformanceContext.Provider>
    );
}