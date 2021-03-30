import React, {useContext} from "react";
import {Canvas, useThree} from "react-three-fiber";
import MovementContext from "../contexts/movement-context";
import CanvasContent from "./canvas-content";


export default function ThreeCanvas() {
    const movementContext = useContext(MovementContext);

    return (
        <Canvas shadowMap={true}>
            <MovementContext.Provider value={movementContext}>
                <CanvasContent/>
            </MovementContext.Provider>
        </Canvas>
    );
}