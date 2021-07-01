import React, {useContext} from "react";
import {Canvas} from "@react-three/fiber";
import MovementContext from "../contexts/movement-context";
import CanvasContent from "./canvas-content";


export default function ThreeCanvas() {
    const movementContext = useContext(MovementContext);

    return (
        <Canvas>
            <MovementContext.Provider value={movementContext}>
                <CanvasContent/>
            </MovementContext.Provider>
        </Canvas>
    );
}