import React from "react";

export interface MovementContextType {
    isMovingForward: boolean;
    isMovingBackward: boolean;
    isTurningRight: boolean;
    isTurningLeft: boolean;
    isReset: boolean;
}

export const MovementContext = React.createContext<MovementContextType>({
    isMovingForward: false,
    isMovingBackward: false,
    isTurningRight: false,
    isTurningLeft: false,
    isReset: true,
});

export default MovementContext;
