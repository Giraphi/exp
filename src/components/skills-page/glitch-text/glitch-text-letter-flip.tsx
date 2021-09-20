import React from "react";
import styled, {css} from "styled-components";

const StyledRoot = styled.span<{ isRotated: boolean }>`
    display: inline-block;

    ${props => props.isRotated && css`
        transform: scaleY(-1);
        transform-origin: 50% 56%;
    `}
`;

export interface GlitchTextLetterFlipProps {
    isGlitch: boolean;
    letter: string;
}

export default function GlitchTextLetterFlip(props: GlitchTextLetterFlipProps) {
    return (
        <StyledRoot isRotated={props.isGlitch}>
            {props.letter}
        </StyledRoot>
    );
}