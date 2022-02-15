import React, {Suspense, useContext, useMemo, useState} from "react";
import {Canvas} from "@react-three/fiber";
import MeCamera from "./Me-camera";
import styled from "styled-components";
import AboutPageContent from "./about-page-content";
import {useHistory} from "react-router-dom";
import MousePositionContext from "../../../contexts/mouse-position-context";
import {HistoryContext} from "../../../contexts/history-context";
import PageMenu from "../../page-menu";
import {Vector3} from "three/src/math/Vector3";
import useDevice from "../../../hooks/use-device";
import {Plane} from "@react-three/drei";
import {colorAbout} from "../../../style/constants";
import Page from "../../page";

const StyledRoot = styled.div`
    position: relative;
    color: ${colorAbout};
    text-shadow: 2px 2px black;
`

const StyledCanvas = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    background: linear-gradient(black, deeppink 50%);
`

const StyledContent = styled.div`
    margin-top: 65vh;
`;

export default function AboutPage() {
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();

    const menuPosition = useMemo(() => {
        return device !== "small" ? new Vector3(0, 0, 0) : new Vector3(0, 0, 0)
    }, [device])

    return (
        <Page>
            <StyledRoot>
                <StyledCanvas>
                    <Canvas gl={{powerPreference: "high-performance"}}>
                        {/*<fog attach="fog" near={10} far={200} color={new Color("deeppink")}/>*/}
                        <MousePositionContext.Provider value={mousePositionContext}>
                            <HistoryContext.Provider value={{history}}>

                                {/*<Sky*/}
                                {/*    sunPosition={[0,0,-1000]}*/}
                                {/*/>*/}

                                <Suspense fallback={null}>
                                    <MeCamera/>
                                </Suspense>

                                <gridHelper args={[1000, 400, "deeppink", "deeppink"]} position={[0, -5, 0]}/>
                                {/*#200825*/}
                                <Plane
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    position={[0, -5.1, 0]}
                                    args={[1000, 1000]}
                                >
                                    <meshStandardMaterial color={"#0A0813"}/>
                                    {/*<meshStandardMaterial color={"white"}  metalness={0.2}/>*/}
                                </Plane>

                                <pointLight intensity={0.2} color={"white"}
                                            position={[-1.85, 1.6, 1]}
                                            castShadow={true}
                                />
                                <pointLight
                                    distance={1000}
                                    decay={0.1}
                                    castShadow={true}
                                    intensity={0.6}
                                    color={"white"}
                                    position={[3, 2, 3]}
                                />
                                <pointLight castShadow={true} intensity={0.1} color={"white"} position={[-1, 0, -1]}/>

                                <group
                                    scale={0.01}
                                    position={device === "small" ? [-0.5, 1.8, 1] : [-1.85, 1.6, 0]}
                                >
                                    <PageMenu
                                        disableWhiteLight={true}
                                        position={menuPosition}
                                        onClick={() => setIsMenuClicked(true)}
                                        hoverColor={"#009905"}
                                        // hoverColor={"deeppink"}
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
        </Page>
    );
}
