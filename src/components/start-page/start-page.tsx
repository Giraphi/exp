import React from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import StartPageWorld from "./start-page-world";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import {motion} from "framer-motion";


// const StyledRoot = styled(motion.div)`
//     background-color: black;
//     height: 100vh;
// `
//
// // Workaround to make the font available as a texture in lightbulb.tsx
// const StyledFontWorkaround = styled.div`
//     font-family: "AuvantGothicBold", sans-serif;
//     position: absolute;
//     z-index: -99;
// `

const StyledRoot = styled(motion.div)`
    height: 100vh;
`

export default function StartPage() {
    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <ThreeBaseline
                controlButtons={<CameraControlButtons/>}
            >
                <StartPageWorld
                    numCuboids={170}
                    size={1000}
                />
            </ThreeBaseline>
        </StyledRoot>
    )

}