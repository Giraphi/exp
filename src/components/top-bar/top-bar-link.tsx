import React, {useState} from "react";
import styled, {css} from "styled-components";
import {Link, useHistory} from "react-router-dom";
import {breakpointSmall} from "../../style/constants";
import {whiteToBlackColorKeyframes} from "./top-bar-keyframes";


const StyledRoot = styled(Link)<{ $isActive: boolean, $isClicked: boolean }>`
    font-size: 30px;
    margin-bottom: 20px;
    animation-timing-function: step-end;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    text-decoration: none;

    @media (min-width: ${breakpointSmall}) {
        font-size: 8vh;
        margin-bottom: 2vh;
    }

    &:hover {
        color: red !important;
    }

    ${props => props.$isActive && css`
        color: red;
        cursor: default;
        pointer-events: none;
    `}
    
    ${props => (!props.$isActive && !props.$isClicked) && css`
        animation-name: ${whiteToBlackColorKeyframes};
    `}
    
    ${props => props.$isClicked && css`
        color: red;
    `}
`;

export interface TopBarLinkProps {
    to: string;
    children: React.ReactNode;
}

export default function TopBarLink(props: TopBarLinkProps) {
    const [isClicked, setIsClicked]= useState(false);
    const pathname = useHistory().location.pathname;

    console.log(pathname)
    console.log(props.to)

    return (
        <StyledRoot
            to={props.to}
            $isActive={pathname === `/${props.to}`}
            onClick={() => setIsClicked(true)}
            $isClicked={isClicked}
        >
            {props.children}
        </StyledRoot>
    );
}