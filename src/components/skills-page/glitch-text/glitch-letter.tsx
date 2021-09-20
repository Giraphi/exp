import React, {useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {breakpointSmall} from "../../../style/constants";

const StyledNormal = styled.span<{ isRotated: boolean }>`
    display: inline-block;

    ${props => props.isRotated && css`
        transform: rotate(180deg) translate(-2px, -2.5px);
        
        @media (min-width: ${breakpointSmall}) {
            transform: rotate(180deg) translate(-0.3vh, -0.5vh);
        }
    `}
`;

const StyledH1 = styled.span<{ isRotated: boolean }>`
    display: inline-block;

    ${props => props.isRotated && css`
        transform: scaleY(-1);
        transform-origin: 50% 56%;
    `}
`;

export interface GlitchLetterProps {
    letter: string;
    style: "h1" | undefined;
}

export default function GlitchLetter(props: GlitchLetterProps) {
    const [isRotated, setIsRotated] = useState(false);
    const timeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const interval = setInterval(() => {
            if (1 - Math.random() < 0.002) {
                setIsRotated(true);
                if (timeout.current) {
                    clearTimeout(timeout.current);
                }
                timeout.current = setTimeout(() => {
                    setIsRotated(false)
                }, 1300);
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
        <>
            {!props.style &&
                <StyledNormal isRotated={isRotated}>
                    {props.letter}
                </StyledNormal>
            }
            {props.style === "h1" &&
                <StyledH1 isRotated={isRotated}>
                    {props.letter}
                </StyledH1>
            }
        </>
    );
}