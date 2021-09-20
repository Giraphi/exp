import React, {useState} from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import {breakpointSmall, colorWork} from "../../style/constants";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import WorkPageWorld from "./work-page-world";
import {useGLTF} from "@react-three/drei";
import {HandGLTFResult} from "../models/hand-model";
import PageLoader from "../page-loader/page-loader";
import Puzzle from "./puzzle/puzzle";
import PuzzleAnimation from "./puzzle/puzzle-animation";

import BoschDaheim from "./images/daheim-portrait.jpg";
import BoschStage from "./images/dorfen-both-compressed.jpg";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    color: ${colorWork};
    overflow: auto;
    background-color: black;
`

const StyledBanner = styled.div`
    height: 75vh;

    @media (min-width: 768px) {
        height: 80vh;
    }

    margin-bottom: -20vh;

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: -7vh;
    }
`
export default function WorkPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const handGlTf = useGLTF('/exp/models/hand/scene.gltf') as HandGLTFResult;
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <PageLoader isLoadFinished={isLoadFinished}>

            <StyledBanner>
                <ThreeBaseline
                    color={"black"}
                    controlButtons={<CameraControlButtons pageVariant={true}/>}
                    onLoadFinished={() => setIsLoadFinished(true)}
                >
                    <WorkPageWorld
                        handGltf={handGlTf}
                    />
                </ThreeBaseline>
            </StyledBanner>

            <PageContentLayout>
                <Puzzle>
                    <PuzzleAnimation
                        isActive={activeSlide === 0}
                        index={0}
                        dimensions={{width: 500, height: 300}}
                    >
                        <img src={BoschDaheim} alt={""} width={"100%"}/>
                    </PuzzleAnimation>
                    <PuzzleAnimation
                        isActive={activeSlide === 1}
                        index={1}
                        dimensions={{width: 500, height: 300}}
                    >
                        <img src={BoschStage} alt={""} width={"100%"}/>
                    </PuzzleAnimation>
                </Puzzle>
                <button onClick={() => setActiveSlide(0)}>0</button>
                <button onClick={() => setActiveSlide(1)}>1</button>
            </PageContentLayout>
            </PageLoader>
        </StyledRoot>
    );
}