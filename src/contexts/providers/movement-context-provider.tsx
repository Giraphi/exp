import { ReactNode, useCallback, useMemo, useState } from "react";
import MovementContext from "../movement-context";
import MovementContextActions, { MovementContextActionsType } from "../movement-context-actions";

export interface MovementContextProviderProps {
    children: ReactNode;
}

export default function MovementContextProvider(props: MovementContextProviderProps) {
    const [isMovingForward, setIsMovingForward] = useState(false);
    const [isMovingBackward, setIsMovingBackward] = useState(false);
    const [isTurningLeft, setIsTurningLeft] = useState(false);
    const [isTurningRight, setIsTurningRight] = useState(false);
    const [isReset, setIsReset] = useState(true);

    const onMoveForward = useCallback((isMovingForward) => {
        setIsMovingForward(isMovingForward);
        setIsReset(false);
    }, []);

    const onMoveBackward = useCallback((isMovingBackward) => {
        setIsMovingBackward(isMovingBackward);
        setIsReset(false);
    }, []);

    const onTurnLeft = useCallback((isTurningLeft) => {
        setIsTurningLeft(isTurningLeft);
        setIsReset(false);
    }, []);

    const onTurnRight = useCallback((isTurningRight) => {
        setIsTurningRight(isTurningRight);
        setIsReset(false);
    }, []);

    const onReset = useCallback((isReset) => {
        console.log("click reset");
        setIsReset(isReset);
    }, []);

    const movementContextActions: MovementContextActionsType = useMemo(() => {
        return {
            setIsMovingForward: onMoveForward,
            setIsMovingBackward: onMoveBackward,
            setIsTurningLeft: onTurnLeft,
            setIsTurningRight: onTurnRight,
            setIsReset: onReset,
        };
    }, [onMoveBackward, onMoveForward, onReset, onTurnLeft, onTurnRight]);

    return (
        <MovementContext.Provider
            value={{
                isMovingForward,
                isMovingBackward,
                isTurningLeft,
                isTurningRight,
                isReset,
            }}
        >
            <MovementContextActions.Provider value={movementContextActions}>{props.children}</MovementContextActions.Provider>
        </MovementContext.Provider>
    );
}
