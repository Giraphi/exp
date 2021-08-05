import React, {ReactNode, useContext, useMemo} from "react";
import {Canvas} from "@react-three/fiber";
import MovementContext from "../../../contexts/movement-context";
import ThreeBaselineCanvasContent from "./three-baseline-canvas-content";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {HistoryContext} from "../../../contexts/history-context";
import MousePositionContext from "../../../contexts/mouse-position-context";
import {CameraPositionContext, CameraPositionContextType} from "../../../contexts/camera-position-context";
import {Vector3} from "three/src/math/Vector3";

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

    const cameraPositionValue: CameraPositionContextType = useMemo(() => {
        return {
            initialPosition: new Vector3(0, 200, 700)
        }
    }, []);

    // Apparently, Context gets lost if <Canvas> is lost, so we re-provide the value within canvas.
    return (
        <StyledCanvas>
            <MousePositionContext.Provider value={mousePositionContext}>
                <MovementContext.Provider value={movementContext}>
                    <HistoryContext.Provider value={{history}}>
                        <CameraPositionContext.Provider value={cameraPositionValue}>
                            <ThreeBaselineCanvasContent>
                                {props.children}
                            </ThreeBaselineCanvasContent>
                        </CameraPositionContext.Provider>
                    </HistoryContext.Provider>
                </MovementContext.Provider>
            </MousePositionContext.Provider>
        </StyledCanvas>
    );
}