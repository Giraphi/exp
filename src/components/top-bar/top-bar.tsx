import React, {useState} from "react";
import styled, {css} from "styled-components";
import {
    blackToWhiteBackgroundKeyframes,
    hideMenuKeyframes,
    showMenuKeyframes,
    whiteToBlackBackgroundKeyframes
} from "./top-bar-keyframes";

const flickerAnimationDurationMs = 2000;
const ButtonSizePx = 60;
const BarHeightPx = 0.08 * ButtonSizePx;
const BarSpacePx = 0.07 * ButtonSizePx;


const flickerAnimationMixin = css`
    animation-timing-function: step-end;
    animation-duration: ${flickerAnimationDurationMs}ms;
    animation-iteration-count: infinite;
`


const StyledTop = styled.div<{ isHidden: boolean }>`
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
    ${flickerAnimationMixin};
    animation-name: ${whiteToBlackBackgroundKeyframes};
`;

const StyledButton = styled.div<{ isMenuOpen: boolean }>`
    width: ${ButtonSizePx}px;
    height: ${ButtonSizePx}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    z-index: 30;

    ${flickerAnimationMixin};
    animation-name: ${blackToWhiteBackgroundKeyframes};


    ${StyledBar}:first-child {
        margin-bottom: ${BarSpacePx}px;
    }

    ${props => props.isMenuOpen && css`
        ${StyledBar}:first-child {
            transform: translateY(calc((${BarHeightPx}px + ${BarSpacePx}px) / 2)) rotate(315deg);
        }

        ${StyledBar}:nth-child(2) {
            transform: translateY(calc(-1 * (${BarHeightPx}px + ${BarSpacePx}px) / 2)) rotate(-315deg);
        }
    `}
`

const StyledMenu = styled.div<{ isMenuOpen: boolean }>`
    width: 100vw;
    height: 100vh;
    
    position: fixed;
    top: 0;
    z-index: 15;
    
    visibility: hidden;
    background-color: black;

    ${props => !props.isMenuOpen && css`
        animation-timing-function: ease-in;
        animation-name: ${hideMenuKeyframes};
        animation-duration: 400ms;
        animation-fill-mode: forwards;
    `}

    ${props => props.isMenuOpen && css`
        animation-timing-function: ease-in;
        animation-name: ${showMenuKeyframes};
        animation-duration: 400ms;
        animation-fill-mode: forwards;
    `}    
`

const StyledInnerMenu = styled.div`
    width: 100%;
    height: 100%;
    ${flickerAnimationMixin};
    animation-name: ${blackToWhiteBackgroundKeyframes};
`

export interface TopBarProps {
    isScrolledToTop: boolean;
}

export default function TopBar(props: TopBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <StyledTop
                isHidden={props.isScrolledToTop && !isMenuOpen}
                onClick={() => setIsMenuOpen(x => !x)}
            >
                <StyledButton isMenuOpen={isMenuOpen}>
                    <StyledBar/>
                    <StyledBar/>
                </StyledButton>

            </StyledTop>
            <StyledMenu isMenuOpen={isMenuOpen}>
                <StyledInnerMenu/>
            </StyledMenu>
        </>
    );
}