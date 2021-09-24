import React, {useState} from "react";
import styled, {css, keyframes} from "styled-components";

const flickerAnimationDurationMs = 2000;
const ButtonSizePx = 60;
const BarHeightPx = 0.08 * ButtonSizePx;
const BarSpacePx = 0.07 * ButtonSizePx;

const blackToWhiteKeyframes = keyframes`
    0% {
        background-color: black;
    }
    50% {
        background-color: white;
    }
    100% {
        background-color: black;
    }
`

const flickerAnimationMixin = css`
    animation-timing-function: step-end;
    animation-name: ${blackToWhiteKeyframes};
    animation-duration: ${flickerAnimationDurationMs}ms;
    animation-iteration-count: infinite;
`

const StyledRoot = styled.div<{isHidden: boolean}>`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 20;
    opacity: 1;
    transition: opacity 0.2s linear;
    display: flex;
    cursor: pointer;
    
    ${props => props.isHidden && css`
        opacity: 0;
        z-index: -1;
    `}
`;

const StyledBar = styled.div`
    height: ${BarHeightPx}px;
    margin-left: 20%;
    margin-right: 20%;
    background-color: white;
    transition: transform 0.4s ease-in;
    
    ${flickerAnimationMixin};
`;

const StyledButton = styled.div<{isMenuOpen: boolean}>`
    width: ${ButtonSizePx}px;
    height: ${ButtonSizePx}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //padding-top: 29px;
    //padding-bottom: 29px;
    background-color: black;

    animation-delay: ${flickerAnimationDurationMs/2}ms;
    ${flickerAnimationMixin};

    ${StyledBar}:first-child {
        margin-bottom: ${BarSpacePx}px;
    }

    ${props => props.isMenuOpen && css`    
        ${StyledBar}:first-child {
            transform: translateY(calc((${BarHeightPx}px + ${BarSpacePx}px) / 2)) rotate(315deg) ;
        }
        ${StyledBar}:nth-child(2) {
            transform: translateY(calc(-1 * (${BarHeightPx}px + ${BarSpacePx}px) / 2)) rotate(-315deg) ;
        }
    `}
`




export interface TopBarProps {
    isHidden: boolean;
}

export default function TopBar(props: TopBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <StyledRoot
            isHidden={props.isHidden}
            onClick={() => setIsMenuOpen(x => !x)}
        >
            <StyledButton isMenuOpen={isMenuOpen}>
                <StyledBar/>
                <StyledBar/>
            </StyledButton>
        </StyledRoot>
    );
}