import React, { useEffect, useRef, useState } from "react";
import GlitchTextLetterFlip from "./glitch-text-letter-flip";
import GlitchTextLetterColor from "./glitch-text-letter-color";

export type GlitchTextLetterVariant = "flip" | "color";

export interface GlitchLetterProps {
    letter: string;
    variant: GlitchTextLetterVariant;
}

export default function GlitchTextLetter(props: GlitchLetterProps) {
    const [isGlitch, setIsGlitch] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const interval = setInterval(() => {
            if (1 - Math.random() < 0.002) {
                setIsGlitch(true);
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                timeout.current = setTimeout(() => {
                    setIsGlitch(false);
                }, 1300);
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (timeout.current) {
                setIsGlitch(false);
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return (
        <>
            {props.variant === "flip" && <GlitchTextLetterFlip isGlitch={isGlitch} letter={props.letter} />}
            {props.variant === "color" && <GlitchTextLetterColor isGlitch={isGlitch} letter={props.letter} />}
        </>
    );
}
