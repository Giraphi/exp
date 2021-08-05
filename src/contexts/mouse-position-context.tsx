import React, {RefObject} from "react";

export interface MousePositionContextType {
    invalidatePosition: () => void,
    mousePositionRef?: RefObject<{x: number, y: number} | undefined>,
}

export const MousePositionContext = React.createContext<MousePositionContextType>(
    {
        invalidatePosition: () => undefined,
    }
);

export default MousePositionContext;