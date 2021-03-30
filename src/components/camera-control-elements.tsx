import React, {useContext} from "react";
import MovementContextActions from "../contexts/movement-context-actions";
import styled, {css} from "styled-components";
import arrow from '../images/arrow.svg';

import arrowWhite from '../images/arrow-white.svg';
import arrowWhitePressed from '../images/arrow-white-pressed.svg';
import MovementContext from "../contexts/movement-context";

const ButtonSize = css`50px`;

const ButtonMixin = (isActive:boolean) => css`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  background-image: url(${arrowWhite});

  ${isActive && css`
      background-image: url(${arrowWhitePressed});
  `}
  
  @media (min-width: 768px) {
    background-image: url(${arrowWhite});

    ${isActive && css`
      background-image: url(${arrowWhitePressed});
    `}
  }
`

const StyledButtonUp = styled.div<{isActive: boolean}>`
  grid-row: 1;
  grid-column: 2;
  ${props => ButtonMixin(props.isActive)};
`

const StyledButtonLeft = styled.div<{isActive: boolean}>`
  grid-row: 2;
  grid-column: 1;
  transform: rotate(-90deg);
  ${props => ButtonMixin(props.isActive)};
`

const StyledButtonRight = styled.div<{isActive: boolean}>`
  grid-row: 2;
  grid-column: 3;
  transform: rotate(90deg);
  ${props => ButtonMixin(props.isActive)};
`

const StyledButtonDown = styled.div<{isActive: boolean}>`
  grid-row: 3;
  grid-column: 2;
  transform: rotate(180deg);
  ${props => ButtonMixin(props.isActive)};
`

const StyledRoot = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  
  bottom: 0;
  padding-bottom: calc(${ButtonSize} / 2);
  padding-right: calc(${ButtonSize} / 2);
  justify-content: flex-end;
  
  @media(min-width: 768px) {
    justify-content: center;
    bottom: 10%;   
    right: unset;
    padding-right: 0;
    padding-bottom: 0;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${ButtonSize});
  grid-template-rows: repeat(3, ${ButtonSize});
  user-select: none;
`

export default function CameraControlElements() {
    const movementContextActions = useContext(MovementContextActions);
    const movementContext = useContext(MovementContext);

    return (
        <StyledRoot>
            <StyledGrid>
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
        </StyledRoot>
    );
}