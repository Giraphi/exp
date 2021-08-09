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
        const interval = setInterval(() => {
            if (1 - Math.random() < 0.003) {
                setIsRotated(true);
                if (timeout.current) {
                    setIsRotated(false);
                    clearTimeout(timeout.current);
                }
                timeout.current = setTimeout(() => {
                    setIsRotated(false)
                }, 1600);
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (timeout.current) {
                setIsRotated(false);
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