import React from "react";
import { Vector3 } from "three/src/math/Vector3";

export interface CameraPositionContextType {
    initialPosition: Vector3;
}

export const CameraPositionContext = React.createContext<CameraPositionContextType>({
    initialPosition: new Vector3(0, 0, 0),
});
