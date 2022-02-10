import React, { useEffect, useRef, useState } from "react";
import GlitchTextLetterFlip from "./glitch-text-letter-flip";
import GlitchTextLetterColor from "./glitch-text-letter-color";

export type GlitchTextLetterVariant = "flip" | "color";

export interface GlitchLetterProps {
    letter: string;
    variant: GlitchTextLetterVariant;
    probability?: number;
    duration?: number
}

export default function GlitchTextLetter(props: GlitchLetterProps) {
    const [isGlitch, setIsGlitch] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    const probability = props.probability || 0.002;
    const duration = props.duration || 1300;


    useEffect(() => {

        const interval = setInterval(() => {
            if (1 - Math.random() < probability) {
                setIsGlitch(true);
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                timeout.current = setTimeout(() => {
                    setIsGlitch(false);
                }, duration);
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (timeout.current) {
                setIsGlitch(false);
                clearTimeout(timeout.current);
            }
        };
    }, [duration, probability]);

    return (
        <>
            {props.variant === "flip" && <GlitchTextLetterFlip isGlitch={isGlitch} letter={props.letter} />}
            {props.variant === "color" && <GlitchTextLetterColor isGlitch={isGlitch} letter={props.letter} />}
        </>
    );
}
