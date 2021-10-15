import React, { useContext, useEffect } from "react";
import MovementContextActions from "../contexts/movement-context-actions";
import styled, { css } from "styled-components";

import MovementContext from "../contexts/movement-context";
import { ArrowBlackUp, ArrowBlackUpFilled, ArrowWhiteUp, ArrowWhiteUpFilled } from "../images/svg-strings";
import { breakpointSmall, fontSizes, lineHeights, spacings } from "../style/constants";

const ButtonSize = "50px";
const ButtonSizeSmall = "40px";

const ButtonMixin = (isActive: boolean, inverse?: boolean) => css`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;

    ${!inverse &&
    css`
        background-image: url("${ArrowWhiteUp}");
        ${isActive &&
        css`
            background-image: url("${ArrowWhiteUpFilled}");
        `}
    `}

    ${inverse &&
    css`
        background-image: url("${ArrowBlackUp}");
        ${isActive &&
        css`
            background-image: url("${ArrowBlackUpFilled}");
        `}
    `}
`;

const StyledButtonUp = styled.div<{ isActive: boolean; inverse?: boolean }>`
    grid-row: 1;
    grid-column: 2;
    ${(props) => ButtonMixin(props.isActive, props.inverse)};
`;

const StyledButtonLeft = styled.div<{ isActive: boolean; inverse?: boolean }>`
    grid-row: 2;
    grid-column: 1;
    transform: rotate(-90deg);
    ${(props) => ButtonMixin(props.isActive, props.inverse)};
`;

const StyledButtonRight = styled.div<{ isActive: boolean; inverse?: boolean }>`
    grid-row: 2;
    grid-column: 3;
    transform: rotate(90deg);
    ${(props) => ButtonMixin(props.isActive, props.inverse)};
`;

const StyledButtonDown = styled.div<{ isActive: boolean; inverse?: boolean }>`
    grid-row: 3;
    grid-column: 2;
    transform: rotate(180deg);
    ${(props) => ButtonMixin(props.isActive, props.inverse)};
`;

const StyledRoot = styled.div<{ isMinimal?: boolean; inverse?: boolean }>`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    flex-direction: column;
    pointer-events: none;

    bottom: 0;
    padding-bottom: calc(${ButtonSize} / 2);
    padding-right: calc(${ButtonSize} / 2);
    align-items: flex-end;

    @media (max-width: ${breakpointSmall}) {
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-left: calc(${ButtonSize} / 2);
    }

    ${(props) =>
        !props.isMinimal &&
        css`
            @media (min-width: 768px) {
                align-items: center;
                bottom: 20px;
                right: unset;
                padding-right: 0;
                padding-bottom: 0;
            }
        `}

    ${(props) =>
        props.isMinimal &&
        css`
            bottom: unset;
            top: 0;
            align-items: flex-end;
            padding-top: calc(${ButtonSize} / 2);
        `}
`;

const StyledGrid = styled.div<{ isMinimal?: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, ${ButtonSizeSmall});
    grid-template-rows: repeat(3, ${ButtonSizeSmall});
    user-select: none;
    pointer-events: auto;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, ${ButtonSize});
        grid-template-rows: repeat(3, ${ButtonSize});
    }

    ${(props) =>
        props.isMinimal &&
        css`
            grid-template-columns: repeat(3, ${ButtonSizeSmall});
            grid-template-rows: repeat(3, ${ButtonSizeSmall});
        `}
`;

const StyledText = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: ${fontSizes.captionSm};
    line-height: ${lineHeights.captionSm};
    color: white;
    font-family: "SourceCodePro", monospace;
    display: none;
    text-align: center;

    @media (min-width: 768px) {
        display: block;
    }
`;

const StyledResetButton = styled.div<{ isHidden: boolean }>`
    pointer-events: auto;
    cursor: pointer;
    color: white;
    font-family: "SourceCodePro", monospace;
    font-size: ${fontSizes.captionSm};
    border: 1px solid white;
    padding-left: 8px;
    padding-right: 8px;
    user-select: none;
    :hover {
        background-color: white;
        color: black;
    }

    opacity: 1;
    transition: opacity 0.6s ease-in;
    ${(props) =>
        props.isHidden &&
        css`
            opacity: 0;
        `}
`;

const StyledButtonMobile = styled.div`
    display: block;
    margin-right: auto;

    @media (min-width: ${breakpointSmall}) {
        display: none;
    }
`;

const StyledButtonDesktop = styled.div`
    display: none;

    @media (min-width: ${breakpointSmall}) {
        display: block;
    }
`;

export interface CameraControlButtonsProps {
    isMinimal?: boolean;
    inverse?: boolean;
}

export default function CameraControlButtons(props: CameraControlButtonsProps) {
    const movementContextActions = useContext(MovementContextActions);
    const movementContext = useContext(MovementContext);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    movementContextActions.setIsMovingForward(true);
                    break;

                case "ArrowLeft":
                case "KeyA":
                    movementContextActions.setIsTurningLeft(true);
                    break;

                case "ArrowDown":
                case "KeyS":
                    movementContextActions.setIsMovingBackward(true);
                    break;

                case "ArrowRight":
                case "KeyD":
                    movementContextActions.setIsTurningRight(true);
                    break;
                default:
                    break;
            }
        }

        function onKeyUp(event: KeyboardEvent) {
            switch (event.code) {
                case "ArrowUp":
                case "KeyW":
                    movementContextActions.setIsMovingForward(false);
                    break;

                case "ArrowLeft":
                case "KeyA":
                    movementContextActions.setIsTurningLeft(false);
                    break;

                case "ArrowDown":
                case "KeyS":
                    movementContextActions.setIsMovingBackward(false);
                    break;

                case "ArrowRight":
                case "KeyD":
                    movementContextActions.setIsTurningRight(false);
                    break;
                default:
                    break;
            }
        }

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.addEventListener("keyup", onKeyUp);
        };
    }, [movementContextActions]);

    function onPress(direction: "forward" | "backward" | "left" | "right") {
        document.body.style.userSelect = "none";
        setTimeout(() => {
            switch (direction) {
                case "forward":
                    movementContextActions.setIsMovingForward(true);
                    break;
                case "backward":
                    movementContextActions.setIsMovingBackward(true);
                    break;
                case "left":
                    movementContextActions.setIsTurningLeft(true);
                    break;
                case "right":
                    movementContextActions.setIsTurningRight(true);
                    break;
            }
        });
    }

    function onRelease(direction: "forward" | "backward" | "left" | "right") {
        document.body.style.userSelect = "";
        setTimeout(() => {
            switch (direction) {
                case "forward":
                    movementContextActions.setIsMovingForward(false);
                    break;
                case "backward":
                    movementContextActions.setIsMovingBackward(false);
                    break;
                case "left":
                    movementContextActions.setIsTurningLeft(false);
                    break;
                case "right":
                    movementContextActions.setIsTurningRight(false);
                    break;
            }
        });
    }

    return (
        <StyledRoot isMinimal={props.isMinimal}>
            {!props.isMinimal && (
                <StyledButtonMobile>
                    <StyledResetButton isHidden={movementContext.isReset} onClick={() => movementContextActions.setIsReset(true)}>
                        Reset Camera
                    </StyledResetButton>
                </StyledButtonMobile>
            )}

            <StyledGrid isMinimal={props.isMinimal}>
                <StyledButtonUp
                    isActive={movementContext.isMovingForward}
                    inverse={props.inverse}
                    onMouseDown={() => onPress("forward")}
                    onTouchStart={() => onPress("forward")}
                    onMouseUp={() => onRelease("forward")}
                    onTouchEnd={() => onRelease("forward")}
                />

                <StyledButtonDown
                    inverse={props.inverse}
                    isActive={movementContext.isMovingBackward}
                    onMouseDown={() => onPress("backward")}
                    onTouchStart={() => onPress("backward")}
                    onMouseUp={() => onRelease("backward")}
                    onTouchEnd={() => onRelease("backward")}
                />

                <StyledButtonLeft
                    inverse={props.inverse}
                    isActive={movementContext.isTurningLeft}
                    onMouseDown={() => onPress("left")}
                    onTouchStart={() => onPress("left")}
                    onMouseUp={() => onRelease("left")}
                    onTouchEnd={() => onRelease("left")}
                />

                <StyledButtonRight
                    inverse={props.inverse}
                    isActive={movementContext.isTurningRight}
                    onMouseDown={() => onPress("right")}
                    onTouchStart={() => onPress("right")}
                    onMouseUp={() => onRelease("right")}
                    onTouchEnd={() => onRelease("right")}
                />
            </StyledGrid>

            {!props.isMinimal && (
                <>
                    <StyledText>
                        Click the arrows to fly. <br />
                        {"Or use W, A, S, D on your keyboard."}
                    </StyledText>

                    <StyledButtonDesktop>
                        {!props.isMinimal && (
                            <StyledResetButton isHidden={movementContext.isReset} onClick={() => movementContextActions.setIsReset(true)}>
                                Reset Camera
                            </StyledResetButton>
                        )}
                    </StyledButtonDesktop>
                </>
            )}
        </StyledRoot>
    );
}
