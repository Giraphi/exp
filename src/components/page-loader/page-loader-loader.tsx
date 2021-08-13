import React from "react";
import styled, {keyframes} from "styled-components";

const rotateKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`


const StyledRoot = styled.div`
    color: black;    
    letter-spacing: 20px;
`

const StyledSpinner = styled.span`
    display: inline-block;
    transform-origin: center;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-name: ${rotateKeyframes};
    animation-iteration-count: infinite;
    letter-spacing: 0;
`

const StyledLetter = styled.span`
    position: relative;
    left: -2px;
`

export default function PageLoaderLoader() {
    return (
        <StyledRoot>
            LOADIN
            <StyledSpinner>
                <StyledLetter>
                    G
                </StyledLetter>
            </StyledSpinner>
        </StyledRoot>
    );
}