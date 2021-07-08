import React, {useContext} from "react";
import {Canvas} from "@react-three/fiber";
import MovementContext from "../../../contexts/movement-context";
import CanvasContent from "./canvas-content";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {HistoryContext} from "../../../contexts/history-context";

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`

export default function ThreeCanvas() {
    const movementContext = useContext(MovementContext);
    const history = useHistory();

    // Apparently, Context gets lost if <Canvas> is lost, so we re-provide the value within canvas.

    return (
        <StyledCanvas>
            <MovementContext.Provider value={movementContext}>
                <HistoryContext.Provider value={{history}}>
                    <CanvasContent/>
                </HistoryContext.Provider>
            </MovementContext.Provider>
        </StyledCanvas>
    );
}