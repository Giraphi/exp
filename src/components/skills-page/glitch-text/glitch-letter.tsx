import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";

const StyledRoot = styled.span<{ isRotated: boolean }>`
    display: inline-block;
    ${props => props.isRotated && css`
        transform: rotate(180deg) translate(-0.3vh, -0.5vh);
    `}
`;

export interface GlitchLetterProps {
    letter: string;
}

export default function GlitchLetter(props: GlitchLetterProps) {
    const [isRotated, setIsRotated] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // return;
        const interval = setInterval(() => {
            if (1 - Math.random() < 0.002) {
                setIsRotated(true);
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                timeout.current = setTimeout(() => {
                    setIsRotated(false)
                }, 2000);
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        }
    }, []);

    return (
        <StyledRoot isRotated={isRotated}>
            {props.letter}
        </StyledRoot>
    );
}