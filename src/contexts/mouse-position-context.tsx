import React, {RefObject} from "react";


export const MousePositionContext = React.createContext<RefObject<{x: number, y: number} | undefined> | undefined>(
    undefined
);

export default MousePositionContext;