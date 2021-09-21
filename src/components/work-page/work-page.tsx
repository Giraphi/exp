import React, {useMemo, useState} from "react";
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

import FutureFaceCut from "./slider-images/future-face-cut.png"
import FutureHands from "./slider-images/future-hands.png"
import FutureHands2 from "./slider-images/future-hands-2.png"
import DCGAN from "./slider-images/DCGAN.png"

import WorkPageImageSlider from "./work-page-image-slider";


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
    font-size: 20px;
    margin-bottom: 50px;
    flex-wrap: wrap;

    a {
        text-decoration: underline;
        color: white;
        :hover {
            text-decoration: line-through;
        }
    }
`

const StyledRowText = styled.div`
    flex-basis: 100%;
    padding: 25px 0;

    @media (min-width: ${breakpointSmall}) {
        flex-basis: 33%;
        padding: 30px;
    }
    
`;

export default function WorkPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const handGlTf = useGLTF('/exp/models/hand/scene.gltf') as HandGLTFResult;

    const images = useMemo(() => {
        return {
            future: [
                FutureFaceCut,
                FutureHands,
                FutureHands2,
                DCGAN
            ],
            bosch: [BoschStage, BoschDaheim],
            maxi: [Maxi, Maxi2],
        }
    }, []);

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
                            images={images.future}
                        />

                        <StyledRowText>
                            <div>Collaboration on the movie project</div>
                            <a target={"_blank"} rel="noopener noreferrer" href={"http://www.thefutureisnotunwritten.com/"}>The future is not unwritten</a>.<br/><br/>
                            Development of a Deep Learning System to generate uncanny image + video material.
                        </StyledRowText>
                    </StyledSliderRow>


                    <StyledSliderRow>
                        <WorkPageImageSlider
                            images={images.bosch}
                        />

                        <StyledRowText>
                            <a target={"_blank"} rel="noopener noreferrer" href={"http://bosch-experimente.com"}>Bosch Band Website</a><br/><br/>
                            <div>Simple Website for my own band project Bosch.</div>
                        </StyledRowText>
                    </StyledSliderRow>

                    <StyledSliderRow>
                        <StyledRowText>
                            <a target={"_blank"} rel="noopener noreferrer" href={"https://maxipongratz.com/"}>Maxipongratz Solo</a><br/><br/>
                            <div>Website + Headless CMS implementation for Musician Maxi Pongratz</div>
                        </StyledRowText>

                        <WorkPageImageSlider
                            images={images.maxi}
                        />

                    </StyledSliderRow>
                </PageContentLayout>
            </PageLoader>
        </StyledRoot>
    );
}