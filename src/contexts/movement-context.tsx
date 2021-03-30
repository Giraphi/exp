import React from 'react';

export interface MovementContextType {
    isMovingForward: boolean;
    isMovingBackward: boolean;
    isTurningRight: boolean;
    isTurningLeft: boolean;
}

export const MovementContext = React.createContext<MovementContextType>({
    isMovingForward: false,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
});

export default MovementContext;
