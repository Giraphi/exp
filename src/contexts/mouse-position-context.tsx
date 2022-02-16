import React, { RefObject } from "react";
import {MousePosition} from "./providers/mouse-position-context-provider";
import {MotionValue} from "framer-motion";

export interface MousePositionContextType {
    invalidatePosition: () => void;
    mousePositionRef?: RefObject<MousePosition | undefined>;
    mousePositionMotionValue?: MotionValue<MousePosition | undefined>;
}

export const MousePositionContext = React.createContext<MousePositionContextType>({
    invalidatePosition: () => undefined,
});

export default MousePositionContext;
