import React from "react";
import styled from "styled-components";
import GlitchTextLetter, { GlitchTextLetterVariant } from "./glitch-text-letter";

const StyledWord = styled.div`
    display: inline-flex;
    white-space: nowrap;
`;

export interface GlitchTextProps {
    text: string;
    variant: GlitchTextLetterVariant;
}

export default function GlitchText(props: GlitchTextProps) {
    const words = props.text.split(" ");

    return (
        <span>
            {words.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                    <StyledWord>
                        {word.split("").map((letter, letterIndex) => (
                            <GlitchTextLetter key={letterIndex} letter={letter} variant={props.variant} />
                        ))}
                    </StyledWord>{" "}
                </React.Fragment>
            ))}
        </span>
    );
}
