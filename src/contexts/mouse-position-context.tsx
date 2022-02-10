import React, { RefObject } from "react";
import {MousePosition} from "./providers/mouse-position-context-provider";

export interface MousePositionContextType {
    invalidatePosition: () => void;
    mousePositionRef?: RefObject<MousePosition | undefined>;
}

export const MousePositionContext = React.createContext<MousePositionContextType>({
    invalidatePosition: () => undefined,
});

export default MousePositionContext;
