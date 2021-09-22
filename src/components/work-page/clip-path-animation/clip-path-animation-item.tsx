import React, {useContext, useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {hideKeyframes, hideKeyframesOdd, showKeyframes, showKeyframesOdd} from "./clip-path-animation-keyframes";
import {ClipPathAnimationContext} from "./clip-path-animation-context";

const easeFunction = css`cubic-bezier(.53, 0, .3, 1)`;

export const animationDurationMs = 800;

const StyledRoot = styled.div<{ isActive: boolean, isOnTop: boolean, oddAnimation: boolean, width?: number }>`
    position: absolute;
    top: 0;

    width: 100%;
    height: 100%;
    animation-fill-mode: forwards;
    animation-timing-function: ${easeFunction};
    animation-duration: ${animationDurationMs}ms;

    ${props => props.isOnTop && css`
        z-index: 1;
    `}

    ${props => !props.isActive && props.width && css`
        ${props.oddAnimation && css`
            animation-name: ${hideKeyframesOdd(props.width / 16)};
        `}
        ${!props.oddAnimation && css`
            animation-name: ${hideKeyframes(props.width / 16)};
        `}
    `}

    ${props => props.isActive && props.width && css`
        ${props.oddAnimation && css`
            animation-name: ${showKeyframesOdd(props.width / 16)};
        `}
        ${!props.oddAnimation && css`
            animation-name: ${showKeyframes(props.width / 16)};
        `}
    `}
`

const StyledDimensionsDummy = styled.div`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
`

export interface ClipPathAnimationItemProps {
    isActive: boolean;
    children: React.ReactNode;
}

export default function ClipPathAnimationItem(props: ClipPathAnimationItemProps) {
    const dimensionsRef = useRef<HTMLDivElement>(null);
    const [isOnTop, setIsOnTop] = useState(props.isActive);
    const useOddAnimation = useContext(ClipPathAnimationContext).numClicksOdd;
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsOnTop(props.isActive);
        }, animationDurationMs / 2)
    }, [props.isActive]);

    return (
        <StyledRoot
            isActive={props.isActive}
            width={(!isFirstRender && dimensionsRef.current) ? Math.round(dimensionsRef.current.clientWidth) : undefined}
            isOnTop={isOnTop}
            oddAnimation={useOddAnimation}
        >
            {props.children}
            <StyledDimensionsDummy ref={dimensionsRef}/>
        </StyledRoot>
    );
}