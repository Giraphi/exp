import React, {useContext, useState} from "react";
import styled, {css} from "styled-components";
import {
    blackToWhiteBackgroundKeyframes,
    hideMenuKeyframes,
    showMenuKeyframes, whiteToBlackColorKeyframes,
} from "./top-bar-keyframes";
import {breakpointSmall, zIndexes} from "../../style/constants";
import {Link, useHistory} from "react-router-dom";

const flickerAnimationDurationMs = 1000;
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
    z-index: ${zIndexes.topBarTop};
    opacity: 1;
    transition: opacity 0.2s linear;
    display: flex;
    cursor: pointer;
    mix-blend-mode: difference;
    //
    // ${props => props.isHidden && css`
    //     opacity: 0;
    //     z-index: ${zIndexes.topBarTopHidden};
    // `}
`;

const StyledBar = styled.div`
    height: ${BarHeightPx}px;
    margin-left: 20%;
    margin-right: 20%;
    background-color: black;
    transition: transform 0.4s ease-in;
`;

const StyledButton = styled.div<{ isMenuOpen: boolean }>`
    width: ${ButtonSizePx}px;
    height: ${ButtonSizePx}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;

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
    z-index: ${zIndexes.topBarMenu};
    
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

const StyledLink = styled(Link)<{$isActive: boolean}>`
    font-size: 30px;
    margin-bottom: 10px;
    ${flickerAnimationMixin};
    animation-name: ${whiteToBlackColorKeyframes};
    text-decoration: none;
    
    @media(min-width: ${breakpointSmall}) {
        font-size: 8vh;
        margin-bottom: 2vh;
    }
    
    &:hover {
        color: red !important;
    }
    
    ${props => props.$isActive && css`
        color: red !important;
        cursor: default;
        pointer-events: none;
    `}
`;

const StyledInnerMenu = styled.div`
    width: 100%;
    height: 100%;
    ${flickerAnimationMixin};
    animation-name: ${blackToWhiteBackgroundKeyframes};
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export interface TopBarProps {
    isScrolledToTop: boolean;
}

export default function TopBar(props: TopBarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = useHistory().location.pathname;
    console.log(pathname);

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
                <StyledInnerMenu>
                    <StyledLink to={"/"} $isActive={pathname === "/"}>
                        Back Home
                    </StyledLink>
                    <StyledLink to={"skills"} $isActive={pathname === "/skills"}>
                        Skills
                    </StyledLink>
                    <StyledLink to={"work"} $isActive={pathname === "/work"}>
                        Work
                    </StyledLink>
                    <StyledLink to={"about"} $isActive={pathname === "/about"}>
                        About Me
                    </StyledLink>
                </StyledInnerMenu>
            </StyledMenu>
        </>
    );
}