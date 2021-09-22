import React from "react";
import styled, {css} from "styled-components";

const StyledRoot = styled.span<{ isColored: boolean }>`
    display: inline-block;

    ${props => props.isColored && css`
        color: deeppink;
    `}
`;

export interface GlitchTextLetterColorProps {
    isGlitch: boolean;
    letter: string;
}

export default function GlitchTextLetterColor(props: GlitchTextLetterColorProps) {
    return (
        <StyledRoot isColored={props.isGlitch}>
            {props.letter}
        </StyledRoot>
    );
}