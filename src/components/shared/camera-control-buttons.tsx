import React, {useContext, useEffect} from "react";
import MovementContextActions from "../../contexts/movement-context-actions";
import styled, {css} from "styled-components";

import arrowWhite from '../../images/arrow-white.svg';
import arrowWhitePressed from '../../images/arrow-white-pressed.svg';
import MovementContext from "../../contexts/movement-context";

const ButtonSize = "50px";
const ButtonSizeSmall = "40px";

const ButtonMixin = (isActive: boolean) => css`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;

    background-image: url(${arrowWhite});
    ${isActive && css`
        background-image: url(${arrowWhitePressed});
    `}
`

const StyledButtonUp = styled.div<{ isActive: boolean }>`
    grid-row: 1;
    grid-column: 2;
    ${props => ButtonMixin(props.isActive)};

`

const StyledButtonLeft = styled.div<{ isActive: boolean }>`
    grid-row: 2;
    grid-column: 1;
    transform: rotate(-90deg);
    ${props => ButtonMixin(props.isActive)};
`

const StyledButtonRight = styled.div<{ isActive: boolean }>`
    grid-row: 2;
    grid-column: 3;
    transform: rotate(90deg);
    ${props => ButtonMixin(props.isActive)};
`

const StyledButtonDown = styled.div<{ isActive: boolean }>`
    grid-row: 3;
    grid-column: 2;
    transform: rotate(180deg);
    ${props => ButtonMixin(props.isActive)};
`

const StyledRoot = styled.div<{ isMinimal?: boolean }>`
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    flex-direction: column;

    bottom: 0;
    padding-bottom: calc(${ButtonSize} / 2);
    padding-right: calc(${ButtonSize} / 2);
    align-items: flex-end;

    ${props => !props.isMinimal && css`
        bottom: 200px;
        @media (min-width: 768px) {
            align-items: center;
            //bottom: 8%;
            right: unset;
            padding-right: 0;
            padding-bottom: 0;
        }
    `}
`

const StyledGrid = styled.div<{isMinimal?: boolean}>`
    display: grid;
    grid-template-columns: repeat(3, ${ButtonSize});
    grid-template-rows: repeat(3, ${ButtonSize});
    user-select: none;

    ${props => props.isMinimal && css`
        grid-template-columns: repeat(3, ${ButtonSizeSmall});
        grid-template-rows: repeat(3, ${ButtonSizeSmall});
        
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, ${ButtonSize});
            grid-template-rows: repeat(3, ${ButtonSize});
        }
    `}
`

const StyledText = styled.div`
    margin-top: 20px;
    color: white;
    font-family: "SourceCodePro", monospace;
    display: none;
    text-align: center;

    @media (min-width: 768px) {
        display: block;
    }
`

export interface CameraControlButtonsProps {
    minimal?: boolean
}

export default function CameraControlButtons(props: CameraControlButtonsProps) {
    const movementContextActions = useContext(MovementContextActions);
    const movementContext = useContext(MovementContext);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    movementContextActions.setIsMovingForward(true);
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    movementContextActions.setIsTurningLeft(true);
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    movementContextActions.setIsMovingBackward(true);
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    movementContextActions.setIsTurningRight(true);
                    break;
                default:
                    break;
            }
        }

        function onKeyUp(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    movementContextActions.setIsMovingForward(false);
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    movementContextActions.setIsTurningLeft(false);
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    movementContextActions.setIsMovingBackward(false);
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    movementContextActions.setIsTurningRight(false);
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
        }
    }, [movementContextActions])

    return (
        <StyledRoot
            isMinimal={props.minimal}
        >
            <StyledGrid
                isMinimal={props.minimal}
            >
                <StyledButtonUp
                    isActive={movementContext.isMovingForward}
                    onMouseDown={() => movementContextActions.setIsMovingForward(true)}
                    onTouchStart={() => movementContextActions.setIsMovingForward(true)}
                    onMouseUp={() => movementContextActions.setIsMovingForward(false)}
                    onTouchEnd={() => movementContextActions.setIsMovingForward(false)}
                />

                <StyledButtonDown
                    isActive={movementContext.isMovingBackward}
                    onMouseDown={() => movementContextActions.setIsMovingBackward(true)}
                    onTouchStart={() => movementContextActions.setIsMovingBackward(true)}
                    onMouseUp={() => movementContextActions.setIsMovingBackward(false)}
                    onTouchEnd={() => movementContextActions.setIsMovingBackward(false)}
                />

                <StyledButtonLeft
                    isActive={movementContext.isTurningLeft}
                    onMouseDown={() => movementContextActions.setIsTurningLeft(true)}
                    onTouchStart={() => movementContextActions.setIsTurningLeft(true)}
                    onMouseUp={() => movementContextActions.setIsTurningLeft(false)}
                    onTouchEnd={() => movementContextActions.setIsTurningLeft(false)}
                />

                <StyledButtonRight
                    isActive={movementContext.isTurningRight}
                    onMouseDown={() => movementContextActions.setIsTurningRight(true)}
                    onTouchStart={() => movementContextActions.setIsTurningRight(true)}
                    onMouseUp={() => movementContextActions.setIsTurningRight(false)}
                    onTouchEnd={() => movementContextActions.setIsTurningRight(false)}
                />
            </StyledGrid>


            {!props.minimal &&
            <StyledText>
                Click the arrows to navigate <br/>
                {"Or use W, A, S, D on your keyboard"}
            </StyledText>
            }
        </StyledRoot>
    );
}