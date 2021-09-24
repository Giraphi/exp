import React, {useRef, useState} from "react";
import {PerformanceContext, Performances} from "../performance-context";
import {useFrame} from "@react-three/fiber";

export interface PerformanceContextProviderProps {
    children: React.ReactNode
}

export default function PerformanceContextProvider(props: PerformanceContextProviderProps) {
    const [performance, setPerformance] = useState<number>(Performances.high);
    const [numSet, setNumSet] = useState(0);

    console.log(performance);

    function setPerformanceByFps(fps: number) {
        switch (performance) {
            case Performances.high:
                if (fps > 50) {
                    break;
                }
                setPerformance(Performances.medium);
                break;
            case Performances.medium:
                if (fps > 58) {
                    setPerformance(Performances.high);
                    break;
                }
                if (fps > 30) {
                    break;
                }
                setPerformance(Performances.low);
                break;
            case Performances.low:
                if (fps > 58) {
                    setPerformance(Performances.medium);
                    break;
                }
                break;
            default:
                throw new Error(`Unsupported Performance ${performance}`)
        }
    }

    const frameCounter = useRef(0);
    const fpsCounter = useRef(0);
    useFrame((state, delta) => {
        const fps = 1 / delta;
        frameCounter.current++;
        fpsCounter.current += fps;

        console.log(fps);

        if (numSet < 5) {
            setNumSet(x => x + 1);
            setPerformanceByFps(fps);
            return;
        }

        if (frameCounter.current < 10) {
            return;
        }

        const averageFps = fpsCounter.current / frameCounter.current;
        frameCounter.current = 0;
        fpsCounter.current = 0;

        setPerformanceByFps(averageFps);
    });

    return (
        <PerformanceContext.Provider value={{performance}}>
            {props.children}
        </PerformanceContext.Provider>
    );
}