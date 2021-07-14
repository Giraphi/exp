import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import StartPageWorld from "./start-page-world";
import CameraControlButtons from "../shared/camera-control-buttons";
import MovementContextProvider from "../../contexts/providers/movement-context-provider";


const StyledRoot = styled(motion.div)`
    background-color: black;
    height: 100vh;
`

// Workaround to make the font available as a texture in lightbulb.tsx
const StyledFontWorkaround = styled.div`
    font-family: "AuvantGothicBold", sans-serif;
    position: absolute;
    z-index: -99;
`

export default function StartPage() {
    return (
        <ThreeBaseline
            controlButtons={<CameraControlButtons/>}
        >
            <StartPageWorld
                numCuboids={170}
                size={1000}
            />
        </ThreeBaseline>
    )

}