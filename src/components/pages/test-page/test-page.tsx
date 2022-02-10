import React, {Suspense, useContext} from "react";
import {Canvas} from "@react-three/fiber";
import MeCamera from "./Me-camera";
import styled from "styled-components";
import AboutPageContent from "./about-page-content";
import {useHistory} from "react-router-dom";
import MousePositionContext from "../../../contexts/mouse-position-context";
import { HistoryContext } from "../../../contexts/history-context";

const StyledRoot = styled.div`
    position: relative;
`

const StyledCanvas = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
`

const StyledContent = styled.div`
    padding-top: 70vh;
`;

export default function TestPage() {
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);

    return (
        <StyledRoot>
            <StyledCanvas>
                <Canvas>
                    <MousePositionContext.Provider value={mousePositionContext}>
                        <HistoryContext.Provider value={{history}}>
                            <ambientLight intensity={1}/>
                            <Suspense fallback={null}>
                                <MeCamera/>
                            </Suspense>
                        </HistoryContext.Provider>
                    </MousePositionContext.Provider>
                </Canvas>
            </StyledCanvas>

            <StyledContent>
                <AboutPageContent/>
            </StyledContent>
        </StyledRoot>
    );
}
