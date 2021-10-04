import React, {useMemo, useState} from "react";
import ThreeSetup from "../../three-setup/three-setup";
import CameraControlButtons from "../../camera-control-buttons";
import styled, {css} from "styled-components";
import {breakpointSmall, colorWork} from "../../../style/constants";
import PageContentLayout from "../../layout/page-content-layout";
import {motion, useMotionTemplate, useTransform, useViewportScroll} from "framer-motion";
import WorkPageWorld from "./work-page-world";
import {useGLTF} from "@react-three/drei";
import {HandGLTFResult} from "../../models/hand-model";
import PageLoader from "../../page-loader/page-loader";

import Bosch1 from "./slider-images/Bosch1.png";
import BoschStage from "./slider-images/dorfen-both-compressed.jpg";
import Maxi1 from "./slider-images/maxi1.png"
import Maxi2 from "./slider-images/maxi2.png"
import FutureFaceCut from "./slider-images/future-face-cut.png"
import FutureHands from "./slider-images/future-hands.png"
import FutureHands2 from "./slider-images/future-hands-2.png"
import Funct1 from "./slider-images/funct1.png"
import Funct2 from "./slider-images/funct2.png"

import WorkPageImageSlider from "./work-page-image-slider";
import useDevice from "../../../hooks/use-device";
import Page from "../../page";


const StyledBanner = styled.div<{isMenuOpen: boolean}>`
    height: 75vh;

    @media (min-width: 768px) {
        height: 80vh;
    }

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 7vh;
    }

    transition: opacity 0.4s ease-in;
    opacity: 1;
    ${props => props.isMenuOpen && css`
        opacity: 0.8;
    `}
`

const StyledRowText = styled.div`
    flex-basis: 100%;
    padding: 25px 0;
    order: 2;

    @media (min-width: ${breakpointSmall}) {
        flex-basis: 33%;
        padding: 30px;
        order: unset;
    }
`;


const StyledSliderRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    color: white;
    font-family: "SourceCodePro", monospace;
    font-size: 18px;
    margin-bottom: 50px;
    flex-wrap: wrap;
    transition: opacity 0.4s ease-in;
    opacity: 1;


    a {
        text-decoration: underline;
        color: white;

        :hover {
            text-decoration: line-through;
        }
    }

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 15vh;
    }
`

const StyledRoot = styled(motion.div)<{isMenuOpen: boolean}>`
    min-height: 100vh;
    position: relative;
    color: ${colorWork};
    overflow: auto;
    
    transition: background-color 0.4s ease-in;
    ${props => props.isMenuOpen && css`
        background-color: white !important;
        
        ${StyledSliderRow} {
            opacity: 0.8;
        }
    `}
`

export default function WorkPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const handGlTf = useGLTF('/exp/models/hand/scene.gltf') as HandGLTFResult;

    const {scrollYProgress} = useViewportScroll();
    const rColorChannel = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8, 1], [0, 30, 40, 35, 0]);
    const gColorChannel = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8, 1], [0, 30, 40, 35, 0]);
    const bColorChannel = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8, 1], [0, 30, 40, 35, 0]);
    const backgroundColor = useMotionTemplate`rgba(${rColorChannel},${gColorChannel},${bColorChannel})`

    const rColorChannelMobile = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.90, 1], [0, 30, 50, 35, 0]);
    const gColorChannelMobile = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.90, 1], [0, 30, 50, 35, 0]);
    const bColorChannelMobile = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.90, 1], [0, 30, 50, 35, 0]);
    const backgroundColorMobile = useMotionTemplate`rgba(${rColorChannelMobile},${gColorChannelMobile},${bColorChannelMobile})`

    const device = useDevice();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const images = useMemo(() => {
        return {
            future: [
                FutureFaceCut,
                FutureHands,
                FutureHands2,
            ],
            bosch: [BoschStage, Bosch1],
            maxi: [Maxi1, Maxi2],
            funct: [Funct1, Funct2],
        }
    }, []);

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
            style={{
                backgroundColor: device === "small" ? backgroundColorMobile : backgroundColor
            }}
            isMenuOpen={isMenuOpen}
        >
            <PageLoader isLoadFinished={isLoadFinished}>
                <Page
                    onMenuToggle={setIsMenuOpen}
                >
                    <StyledBanner
                        isMenuOpen={isMenuOpen}
                    >
                        <ThreeSetup
                            color={"black"}
                            controlButtons={<CameraControlButtons pageVariant={true}/>}
                            onLoadFinished={() => setIsLoadFinished(true)}
                        >
                            <WorkPageWorld
                                handGltf={handGlTf}
                            />
                        </ThreeSetup>
                    </StyledBanner>

                    <PageContentLayout>
                        <StyledSliderRow>
                            <WorkPageImageSlider
                                images={images.funct}
                            />

                            <StyledRowText>
                                <div>Full-time Frontend Developer at Munich based web agency <a target={"_blank"}
                                                                                                rel="noopener noreferrer"
                                                                                                href={"https://funct.com/"}>funct</a>.
                                </div>
                            </StyledRowText>
                        </StyledSliderRow>

                        <StyledSliderRow>
                            <WorkPageImageSlider
                                images={images.future}
                            />

                            <StyledRowText>
                                <div>Collaboration on the movie project</div>
                                <a target={"_blank"} rel="noopener noreferrer"
                                   href={"http://www.thefutureisnotunwritten.com/"}>The future is not
                                    unwritten</a>.<br/>
                                Development of a Deep Learning System to generate uncanny image + video material.
                            </StyledRowText>
                        </StyledSliderRow>

                        <StyledSliderRow>
                            <WorkPageImageSlider
                                images={images.bosch}
                            />

                            <StyledRowText>
                                <a target={"_blank"} rel="noopener noreferrer" href={"http://bosch-experimente.com"}>Bosch
                                    Band Website</a><br/>
                                <div>Website for the band project Bosch.</div>
                            </StyledRowText>
                        </StyledSliderRow>

                        <StyledSliderRow>
                            <StyledRowText>
                                <a target={"_blank"} rel="noopener noreferrer" href={"https://maxipongratz.com/"}>Maxipongratz
                                    Solo</a><br/>
                                <div>Website + Headless CMS implementation for Musician Maxi Pongratz</div>
                            </StyledRowText>

                            <WorkPageImageSlider
                                images={images.maxi}
                            />
                        </StyledSliderRow>
                    </PageContentLayout>
                </Page>
            </PageLoader>
        </StyledRoot>
    );
}