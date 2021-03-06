import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
    hideKeyframes,
    hideKeyframesOdd,
    imageKeyframesHide,
    imageKeyframesShow,
    showKeyframes,
    showKeyframesOdd,
} from "./clip-path-animation-keyframes";
import { ClipPathAnimationContext } from "./clip-path-animation-context";
import { zIndexes } from "../../../../style/constants";

const easeFunction = css`cubic-bezier(.53, 0, .3, 1)`;

export const animationDurationMs = 1100;

const StyledChildren = styled.div`
    width: 100%;
    height: 100%;
    animation-fill-mode: forwards;
    animation-timing-function: ${easeFunction};
    animation-duration: ${animationDurationMs}ms;
`;

const StyledRoot = styled.div<{
    isActive: boolean;
    isOnTop: boolean;
    isBelowTop: boolean;
    oddAnimation: boolean;
    width?: number;
}>`
    position: absolute;
    top: 0;
    overflow: hidden;

    width: 100%;
    height: 100%;
    animation-fill-mode: forwards;
    animation-timing-function: ${easeFunction};
    animation-duration: ${animationDurationMs}ms;

    z-index: 0;
    ${(props) =>
        props.isOnTop &&
        css`
            z-index: ${zIndexes.clipPathAnimationItemTop};
        `}

    ${(props) =>
        props.isBelowTop &&
        css`
            z-index: ${zIndexes.clipPathAnimationItemBelowTop};
        `}

    ${(props) =>
        !props.isActive &&
        props.width &&
        css`
            ${StyledChildren} {
                animation-name: ${imageKeyframesHide};
            }
            ${props.oddAnimation &&
            css`
                animation-name: ${hideKeyframesOdd(props.width / 16)};
            `}
            ${!props.oddAnimation &&
            css`
                animation-name: ${hideKeyframes(props.width / 16)};
            `}
        `}

    ${(props) =>
        props.isActive &&
        props.width &&
        css`
            ${StyledChildren} {
                animation-name: ${imageKeyframesShow};
            }
            ${props.oddAnimation &&
            css`
                animation-name: ${showKeyframesOdd(props.width / 16)};
            `}
            ${!props.oddAnimation &&
            css`
                animation-name: ${showKeyframes(props.width / 16)};
            `}
        `}
`;

const StyledDimensionsDummy = styled.div`
    position: absolute;
    z-index: ${zIndexes.clipPathDummy};
    width: 100%;
    height: 100%;
    top: 0;
`;

export interface ClipPathAnimationItemProps {
    isActive: boolean;
    children: React.ReactNode;
    isFirstCycle: boolean;
}

export default function ClipPathAnimationItem(props: ClipPathAnimationItemProps) {
    const dimensionsRef = useRef<HTMLDivElement>(null);
    const [isOnTop, setIsOnTop] = useState(props.isActive);
    const [isBelowTop, setIsBelowTop] = useState(false);
    const useOddAnimation = useContext(ClipPathAnimationContext).numClicksOdd;

    useEffect(() => {
        // happens if props.isActive changes, i.e. item is involved in the animation
        setIsBelowTop(!props.isActive);

        const timeout = setTimeout(() => {
            setIsOnTop(props.isActive);
        }, animationDurationMs / 2);

        const timeout2 = setTimeout(() => {
            setIsBelowTop(false);
        }, animationDurationMs);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        };
    }, [props.isActive]);

    return (
        <StyledRoot
            isActive={props.isActive}
            isBelowTop={isBelowTop}
            width={!props.isFirstCycle && dimensionsRef.current ? Math.round(dimensionsRef.current.clientWidth) : undefined}
            isOnTop={isOnTop}
            oddAnimation={useOddAnimation}
        >
            <StyledChildren>{props.children}</StyledChildren>
            <StyledDimensionsDummy ref={dimensionsRef} />
        </StyledRoot>
    );
}
