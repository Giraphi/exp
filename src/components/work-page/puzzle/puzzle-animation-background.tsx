import React from "react";
import styled, {css, keyframes} from "styled-components";
import {Dimensions} from "./puzzle-animation";

const dvEaseFunction = css`cubic-bezier(.53,0,.3,1)`;
export const backgroundAnimationFreezePercentage = 0.2;
const backgroundScaleFactor = 1.1;
const percentageStop = `${50 - (backgroundAnimationFreezePercentage * 100 / 2)}%`
const percentageContinue = `${50 + (backgroundAnimationFreezePercentage * 100 / 2)}%`

const hideRectKeyframes = (scaleFactor: number) => keyframes`
    0% {
        transform: scale(1);
    }
    ${percentageStop} {
        transform: scale(${scaleFactor})
    }
    ${percentageContinue} {
        transform: scale(${scaleFactor})
    }
    100% {
        transform: scale(0);
    }
`

const showRectKeyframes = (scaleFactor: number) => keyframes`
    0% {
        transform: scale(1);
    }
    ${percentageStop} {
        transform: scale(${scaleFactor})
    }
    ${percentageContinue} {
        transform: scale(${scaleFactor})
    }
    100% {
        transform: scale(1);
    }
`

const hideChildrenKeyframes = (scaleFactor: number) => keyframes`
    0% {
        transform: scale(1);
    }
    ${percentageStop}, 100% {
        transform: scale(${scaleFactor});
    }
`

const showChildrenKeyframes = (scaleFactor: number) => keyframes`
    0% {
        transform: scale(1);
    }
    ${percentageStop}, ${percentageContinue} {
        transform: scale(${scaleFactor});
    }
    100% {
        transform: scale(1);
    }
`

export const StyledAnimation = styled.div<StyledAnimationProps>`
    position: absolute;
    width: 100%;
    height: 100%;   
    transform: translateZ(0);
    clip-path: ${props => `url(#${props.clipId})`};
    
    ${props => props.isOnTop && css`
        z-index: 20;
    `}

    ${props => !props.isOnTop && css`
        z-index: 10;
    `}
  
    .rect1,
    .rect2,
    .rect3 {        
        animation-timing-function: ${dvEaseFunction};      
        animation-duration: ${props => props.animationDurationMs}ms;
      
        ${props => props.isAnimationDisabled && css`        
            animation-duration: 0s;
        `}
    }
    
    .rect1 {
        animation-fill-mode: forwards;
        
        ${props => !props.isAnimationDisabled && css`            
            ${props.triggerHide && css`
                animation-name: ${hideRectKeyframes(props.clipPathConfig.rect1Scale)}
            `}
            ${props.triggerShow && css`
                animation-name: ${showRectKeyframes(props.clipPathConfig.rect1Scale)}
            `}
        `}     
    }

    .rect2 {
        animation-fill-mode: forwards;

        ${props => !props.isAnimationDisabled && css`
            ${props.triggerHide && css`
                animation-name: ${hideRectKeyframes(props.clipPathConfig.rect2Scale)}

            `}
            ${props.triggerShow && css`
                animation-name: ${showRectKeyframes(props.clipPathConfig.rect2Scale)}
            `}
        `}
    }

    .rect3 {
        animation-fill-mode: forwards;

        ${props => !props.isAnimationDisabled && css`
            ${props.triggerHide && css`
                animation-name: ${hideRectKeyframes(props.clipPathConfig.rect3Scale)}
            `}
            ${props.triggerShow && css`
                animation-name: ${showRectKeyframes(props.clipPathConfig.rect3Scale)}
            `}
        `}
    }

    overflow: hidden;
    > * {
        animation-fill-mode: forwards;
        animation-timing-function: ${dvEaseFunction};
        animation-duration: ${props => props.animationDurationMs}ms;
        transform-origin: center;

        ${props => !props.isAnimationDisabled && css`        
            ${props.triggerHide && css`
                animation-name: ${hideChildrenKeyframes(backgroundScaleFactor)}
            `}
            ${props.triggerShow && css`
                animation-name: ${showChildrenKeyframes(backgroundScaleFactor)};
            `}
        `}        
    }
`
export interface AnimationClipPathConfig {
    rect1Scale: number,
    rect1Width: number,
    rect1Height: number,
    rect1OriginX: number,
    rect1OriginY: number,

    rect2Scale: number,
    rect2Width: number,
    rect2Height: number,
    rect2OriginX: number,
    rect2OriginY: number,

    rect3Scale: number,
    rect3Width: number,
    rect3Height: number,
    rect3OriginX: number,
    rect3OriginY: number,
}

export interface StyledAnimationProps {
    triggerHide: boolean,
    triggerShow: boolean,
    isOnTop: boolean,
    clipId: string,
    animationDurationMs: number,
    clipPathConfig: AnimationClipPathConfig,
    isAnimationDisabled: boolean
}

export interface PuzzleBackgroundProps extends StyledAnimationProps {
    children: React.ReactNode;
    dimensions: Dimensions,
}

export default function PuzzleAnimationBackground(props: PuzzleBackgroundProps) {
    const {children, dimensions, ...styledAnimationProps} = props;

    // props.dimensions changes frequently if a user resizes their window. Don't pass props.dimensions
    // to styled-components as a prop or we are rapidly generating new css classes and style definitions
    // during a resize.
    // Handling the style changes as inline style directly on the rect elements seems like the most efficient solution

    console.log(dimensions);

    return (
        <StyledAnimation {...styledAnimationProps}>
            {children}

            {dimensions.width && dimensions.height &&
                <svg width="0" height="0">
                    <defs>
                        <clipPath id={props.clipId}>
                            <rect className={"rect1"} x={0} y={0}
                                width={`${dimensions.width * props.clipPathConfig.rect1Width}px`}
                                height={`${dimensions.height * props.clipPathConfig.rect1Height}px`}
                                style={{transformOrigin:
                                        `${dimensions.width * props.clipPathConfig.rect1OriginX}px
                                         ${dimensions.height * props.clipPathConfig.rect1OriginY}px`}}
                            />
                            <rect className={"rect2"} x={0} y={0}
                                  width={`${dimensions.width * props.clipPathConfig.rect2Width}px`}
                                  height={`${dimensions.height * props.clipPathConfig.rect2Height}px`}
                                  style={{transformOrigin:
                                          `${dimensions.width * props.clipPathConfig.rect2OriginX}px
                                           ${dimensions.height * props.clipPathConfig.rect2OriginY}px`}
                                  }
                            />
                            <rect className={"rect3"} x={0} y={0}
                                  width={`${dimensions.width * props.clipPathConfig.rect3Width}px`}
                                  height={`${dimensions.height * props.clipPathConfig.rect3Height}px`}
                                  style={{transformOrigin:
                                          `${dimensions.width * props.clipPathConfig.rect3OriginX}px
                                           ${dimensions.height * props.clipPathConfig.rect3OriginY}px`}}
                            />
                        </clipPath>
                    </defs>
                </svg>
            }

        </StyledAnimation>
    );
}
