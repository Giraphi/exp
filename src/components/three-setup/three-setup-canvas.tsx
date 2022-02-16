import React, { ReactNode, useContext, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import MovementContext from "../../contexts/movement-context";
import ThreeSetupCanvasContent from "./three-setup-canvas-content";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { HistoryContext } from "../../contexts/history-context";
import MousePositionContext from "../../contexts/mouse-position-context";
import { CameraPositionContext, CameraPositionContextType } from "../../contexts/camera-position-context";
import { Vector3 } from "three/src/math/Vector3";

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`;

export interface ThreeSetupCanvasProps {
    children: ReactNode;
    onLoadFinished?: () => void;
    cursorControlCamera: boolean;
}

export default function ThreeSetupCanvas(props: ThreeSetupCanvasProps) {
    const movementContext = useContext(MovementContext);
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);

    const cameraPositionValue: CameraPositionContextType = useMemo(() => {
        return {
            initialPosition: new Vector3(0, 200, 700),
        };
    }, []);

    // Apparently, Context gets lost if <Canvas> is lost, so we re-provide the value within canvas.
    return (
        <StyledCanvas gl={{ powerPreference: "high-performance" }}>
            <MousePositionContext.Provider value={mousePositionContext}>
                <MovementContext.Provider value={movementContext}>
                    <HistoryContext.Provider value={{ history }}>
                        <CameraPositionContext.Provider value={cameraPositionValue}>
                            <ThreeSetupCanvasContent
                                cursorControlCamera={props.cursorControlCamera}
                                onLoadFinished={props.onLoadFinished}>
                                {props.children}
                            </ThreeSetupCanvasContent>
                        </CameraPositionContext.Provider>
                    </HistoryContext.Provider>
                </MovementContext.Provider>
            </MousePositionContext.Provider>
        </StyledCanvas>
    );
}
