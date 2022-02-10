import React, {Suspense, useContext, useState} from "react";
import {Canvas} from "@react-three/fiber";
import MeCamera from "./Me-camera";
import styled from "styled-components";
import AboutPageContent from "./about-page-content";
import {useHistory} from "react-router-dom";
import MousePositionContext from "../../../contexts/mouse-position-context";
import { HistoryContext } from "../../../contexts/history-context";
import FlyingPageObjects from "../../flying-page-objects";

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
    const [isMenuClicked, setIsMenuClicked] = useState(false);


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

                            <group position={[0,50,0]}>

                                <FlyingPageObjects numObjects={300} worldSize={100} lift={isMenuClicked}>
                                    <meshStandardMaterial attach="material" color="red" />
                                    <boxBufferGeometry args={[1, 1, 1]} />
                                </FlyingPageObjects>
                            </group>

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
