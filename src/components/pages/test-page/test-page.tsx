import React, {Suspense, useContext, useMemo, useState} from "react";
import {Canvas} from "@react-three/fiber";
import MeCamera from "./Me-camera";
import styled from "styled-components";
import AboutPageContent from "./about-page-content";
import {useHistory} from "react-router-dom";
import MousePositionContext from "../../../contexts/mouse-position-context";
import {HistoryContext} from "../../../contexts/history-context";
import RotatingObjects from "../../rotating-objects";
import PageMenu from "../../page-menu";
import {Vector3} from "three/src/math/Vector3";
import useDevice from "../../../hooks/use-device";

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
    pointer-events: none;
`;

export default function TestPage() {
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();

    const menuPosition = useMemo(() => {
        return device !== "small" ? new Vector3(0, 0, 0) : new Vector3(0, 0, 0)
    }, [device])

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

                            <RotatingObjects
                                numObjects={200} minDistance={1} maxDistance={20} height={10}>

                                <meshStandardMaterial attach="material" color="red"/>
                                <boxBufferGeometry args={[0.1, 0.1, 0.1]}/>
                            </RotatingObjects>

                            <gridHelper args={[1000, 400, `black`, `black`]} position={[0, -5, 0]}/>

                            <group scale={0.1}>
                                <PageMenu
                                    position={menuPosition}
                                    onClick={() => setIsMenuClicked(true)}
                                />
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
