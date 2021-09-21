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

import BoschDaheim from "./slider-images/daheim-portrait.jpg";
import BoschStage from "./slider-images/dorfen-both-compressed.jpg";
import Maxi from "./slider-images/maxi.png"
import Maxi2 from "./slider-images/maxi2.png"

import WorkPageImageSlider from "./work-page-bosch-slider/work-page-image-slider";



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

const StyledSliderRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    color: white;
    font-family: "SourceCodePro", monospace;
    font-size: 25px;
    margin-bottom: 50px;

    a {
        text-decoration: underline;
        color: white;
        :hover {
            text-decoration: line-through;
        }
    }
`


const StyledBoschText = styled.div`
    flex-basis: 66%;
    margin-left: 5%;
`

const StyledMaxiText = styled.div`
    //flex-basis: 33%;
    flex-basis: 66%;
`;

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
                    <StyledSliderRow>
                        <WorkPageImageSlider
                            images={[BoschStage, BoschDaheim]}
                        />

                        <StyledBoschText>
                            <a target={"_blank"} rel="noopener noreferrer" href={"http://bosch-experimente.com"}>Bosch Band Website</a>
                            <div>Simple Website for my own band project Bosch.</div>
                        </StyledBoschText>
                    </StyledSliderRow>

                    <StyledSliderRow>
                        <StyledMaxiText>
                            <a target={"_blank"} rel="noopener noreferrer" href={"https://maxipongratz.com/"}>Maxipongratz Solo</a>
                            <div>Website + Headless CMS implementation for Musician Maxi Pongratz</div>
                        </StyledMaxiText>

                        <WorkPageImageSlider
                            images={[Maxi, Maxi2]}
                        />

                    </StyledSliderRow>
                </PageContentLayout>
            </PageLoader>
        </StyledRoot>
    );
}