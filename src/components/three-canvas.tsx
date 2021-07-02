import React, {useContext} from "react";
import {Canvas} from "@react-three/fiber";
import MovementContext from "../contexts/movement-context";
import CanvasContent from "./canvas-content";
import styled from "styled-components";

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`

export default function ThreeCanvas() {
    const movementContext = useContext(MovementContext);

    return (
        <StyledCanvas>
            <MovementContext.Provider value={movementContext}>
                <CanvasContent/>
            </MovementContext.Provider>
        </StyledCanvas>
    );
}