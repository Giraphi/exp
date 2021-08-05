import React from "react";

export interface CameraPositionContextType {
    initialPosition: [number, number, number];
}

export const CameraPositionContext = React.createContext<CameraPositionContextType>({
    initialPosition: [0,0,0]
});
