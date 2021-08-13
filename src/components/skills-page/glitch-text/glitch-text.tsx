import React from "react";
import styled from "styled-components";
import GlitchLetter from "./glitch-letter";

const StyledWord = styled.div`
    display: inline-flex;
    white-space: nowrap;
`

export interface GlitchTextProps {
    text: string;
    style?: "h1";
}

export default function GlitchText(props: GlitchTextProps) {
    const words = props.text.split(" ");

    return (
        <span>
            {words.map((word, wordIndex) =>
                <React.Fragment key={wordIndex}>
                    <StyledWord>
                        {word.split("").map((letter, letterIndex) => (
                            <GlitchLetter
                                key={letterIndex}
                                letter={letter}
                                style={props.style}
                            />
                        ))}
                    </StyledWord>
                    {" "}
                </React.Fragment>
            )}
        </span>
    );
}

