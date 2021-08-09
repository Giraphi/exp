import React, {useEffect} from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import StartPageWorld from "./start-page-world";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import {motion} from "framer-motion";

const StyledRoot = styled(motion.div)`
    height: 100vh;
    background-color: black;
    padding-bottom: 70px;
    
    @media (min-width: 768px) {
        padding-bottom: 0;
    }
`

export default function StartPage() {
    useEffect(() => {
        document.body.classList.add("is-start-page");
        return () => document.body.classList.remove("is-start-page");
    }, [])

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
                <ThreeBaseline
                    color={"black"}
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