import React, {ReactNode, useContext} from "react";
import {Canvas} from "@react-three/fiber";
import MovementContext from "../../../contexts/movement-context";
import ThreeBaselineCanvasContent from "./three-baseline-canvas-content";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {HistoryContext} from "../../../contexts/history-context";
import MousePositionContext from "../../../contexts/mouse-position-context";

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`

export interface ThreeBaselineCanvasProps {
    children: ReactNode;
}

export default function ThreeBaselineCanvas(props: ThreeBaselineCanvasProps) {
    const movementContext = useContext(MovementContext);
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);

    // Apparently, Context gets lost if <Canvas> is lost, so we re-provide the value within canvas.

    return (
        <StyledCanvas>
            <MousePositionContext.Provider value={mousePositionContext}>
                <MovementContext.Provider value={movementContext}>
                    <HistoryContext.Provider value={{history}}>
                        <ThreeBaselineCanvasContent>
                            {props.children}
                        </ThreeBaselineCanvasContent>
                    </HistoryContext.Provider>
                </MovementContext.Provider>
            </MousePositionContext.Provider>
        </StyledCanvas>
    );
}