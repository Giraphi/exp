import {useMemo, useState} from "react";
import MovementContext from "../movement-context";
import MovementContextActions, {MovementContextActionsType} from "../movement-context-actions";

export interface MovementContextProviderProps {
    children: React.ReactNode;
}

export default function MovementContextProvider(props:MovementContextProviderProps) {
    const [isMovingForward, setIsMovingForward] = useState(false);
    const [isMovingBackward, setIsMovingBackward] = useState(false);
    const [isTurningLeft, setIsTurningLeft] = useState(false);
    const [isTurningRight, setIsTurningRight] = useState(false);

    const movementContextActions: MovementContextActionsType = useMemo(() => {
       return {
           setIsMovingForward,
           setIsMovingBackward,
           setIsTurningLeft,
           setIsTurningRight,
       }
    }, []);

    return (
        <MovementContext.Provider value={{isMovingForward, isMovingBackward, isTurningLeft, isTurningRight}}>
            <MovementContextActions.Provider value={movementContextActions}>
                {props.children}
            </MovementContextActions.Provider>
        </MovementContext.Provider>
    )
}