import React, {useState} from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import {breakpointSmall, colorAbout, colorWork} from "../../style/constants";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import WorkPageWorld from "./work-page-world";
import {useGLTF} from "@react-three/drei";
import {HandGLTFResult} from "../models/hand-model";
import PageLoader from "../page-loader/page-loader";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    color: ${colorWork};
    background-color: black;
    overflow: auto;
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
            </PageContentLayout>
            </PageLoader>
        </StyledRoot>
    );
}