import React, {useEffect, useRef, useState} from "react";
import styled, {css, keyframes} from "styled-components";

const easeFunction = css`cubic-bezier(.53, 0, .3, 1)`;
export const backgroundAnimationFreezePercentage = 0.2;
const percentagePause = `${50 - (backgroundAnimationFreezePercentage * 100 / 2)}%`
const percentageContinue = `${50 + (backgroundAnimationFreezePercentage * 100 / 2)}%`
export const animationDurationMs = 800;

const hideKeyframes = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${4 * unit}px 0%,
        ${7 * unit}px 0%,
        ${10 * unit}px 0%,
        100% 0%,
        100% 75%,
        100% 100%,
        ${7 * unit}px 100%,
        ${4 * unit}px 100%,
        0% 100%,
        0% 75%,
        0% 0%,
        ${unit}px 0%);
    }
    ${percentagePause} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px)
    }
    ${percentageContinue} {
        clip-path: polygon(${9 * unit}px ${unit}px,
        ${10 * unit}px ${unit}px,
        ${10 * unit}px ${5 * unit}px,
        ${11 * unit}px ${5 * unit}px,
        ${11 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${6 * unit}px,
        ${10 * unit}px ${7 * unit}px,
        ${9 * unit}px ${7 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${9 * unit}px ${6 * unit}px,
        ${8 * unit}px ${6 * unit}px,
        ${8 * unit}px ${5 * unit}px,
        ${9 * unit}px ${5 * unit}px)
    }
    100% {
        clip-path: polygon(${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px,
        ${9.5 * unit}px ${5.5 * unit}px);
    }
`

const showKeyframes = (unit: number) => keyframes`
    0% {
        clip-path: polygon(${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px,
        ${5.5 * unit}px ${3.5 * unit}px);
    }
    ${percentagePause} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    ${percentageContinue} {
        clip-path: polygon(${5 * unit}px ${2 * unit}px,
        ${6 * unit}px ${2 * unit}px,
        ${6 * unit}px ${3 * unit}px,
        ${7 * unit}px ${3 * unit}px,
        ${7 * unit}px ${4 * unit}px,
        ${6 * unit}px ${4 * unit}px,
        ${6 * unit}px ${7 * unit}px,
        ${5 * unit}px ${7 * unit}px,
        ${5 * unit}px ${4 * unit}px,
        ${4 * unit}px ${4 * unit}px,
        ${4 * unit}px ${3 * unit}px,
        ${5 * unit}px ${3 * unit}px);
    }
    100% {
        clip-path: polygon(${4 * unit}px 0%,
        ${7 * unit}px 0%,
        ${10 * unit}px 0%,
        100% 0%,
        100% 75%,
        100% 100%,
        ${7 * unit}px 100%,
        ${4 * unit}px 100%,
        0% 100%,
        0% 75%,
        0% 0%,
        ${unit}px 0%);
    }
`


const StyledRoot = styled.div<{ isActive: boolean, isOnTop: boolean, width?: number }>`
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
        animation-name: ${hideKeyframes(props.width / 16)}
    `}

    ${props => props.isActive && props.width && css`
        animation-name: ${showKeyframes(props.width / 16)}
    `}

`

export interface ClipPathAnimationProps {
    isActive: boolean;
    children: React.ReactNode;
}

export default function ClipPathAnimation(props: ClipPathAnimationProps) {
    const dimensionsRef = useRef<HTMLDivElement>(null);
    const [isOnTop, setIsOnTop] = useState(props.isActive);

    useEffect(() => {
        setTimeout(() => {
            setIsOnTop(props.isActive);
        }, animationDurationMs / 2)
    }, [props.isActive]);


    return (
        <StyledRoot
            isActive={props.isActive}
            width={dimensionsRef.current ? Math.round(dimensionsRef.current.clientWidth) : undefined}
            isOnTop={isOnTop}
        >
            {props.children}
            <div ref={dimensionsRef} style={{position: "absolute", zIndex: -1, width: "100%", height: "100%"}}/>
        </StyledRoot>
    );
}