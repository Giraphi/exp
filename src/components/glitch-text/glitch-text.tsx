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
    probability?: number;
    duration?: number;
}

export default function GlitchText(props: GlitchTextProps) {
    const words = props.text.split(new RegExp(" "));

    return (
        <span>
            {words.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                    <StyledWord>
                        {word.split("").map((letter, letterIndex) => (
                            <GlitchTextLetter
                                key={letterIndex}
                                letter={letter}
                                variant={props.variant}
                                probability={props.probability}
                                duration={props.duration}
                            />
                        ))}
                    </StyledWord>{" "}
                </React.Fragment>
            ))}
        </span>
    );
}
