import React from 'react';

export interface MovementContextActionsType {
    setIsMovingForward: (isMovingForward: boolean) => void;
    setIsMovingBackward: (isMovingBackward: boolean) => void;
    setIsTurningLeft: (isTurningLeft: boolean) => void;
    setIsTurningRight: (isTurningRight: boolean) => void;
}

export const MovementContextActions = React.createContext<MovementContextActionsType>({
    setIsMovingForward: () => undefined,
    setIsMovingBackward: () => undefined,
    setIsTurningLeft: () => undefined,
    setIsTurningRight: () => undefined,
});

export default MovementContextActions;
