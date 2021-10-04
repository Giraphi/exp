import React, {useContext, useState} from "react";
import styled, {css} from "styled-components";
import ThreeSetup from "../../three-setup/three-setup";
import CameraControlButtons from "../../camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../../layout/page-content-layout";
import {motion, useMotionTemplate, useTransform, useViewportScroll} from "framer-motion";
import {breakpointSmall, zIndexes} from "../../../style/constants";
import GlitchText from "./glitch-text/glitch-text";
import PageLoader from "../../page-loader/page-loader";
import {useGLTF} from "@react-three/drei";
import {EyeGLTFResult} from "../../models/eye-model";
import SmallEye from "./small-eye";
import {LayoutTextItem, LayoutTextSection} from "../../layout/utilities";
import Page from "../../page";
import MenuContext from "../../../contexts/menu-context";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    overflow: auto;

    @media (min-width: ${breakpointSmall}) {
        user-select: auto;
    }
`

const StyledBanner = styled.div`
    height: 120vh;

    margin-bottom: -40vh;

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: -45vh;
    }
`

const StyledText = styled.div`
    text-align: center;
    font-family: "AuvantGothicBold", sans-serif;
    color: black;
    margin-bottom: 75px;
    position: relative;
    z-index: ${zIndexes.skillsPageText};

    @media (min-width: 768px) {
        margin-top: 10px;
    }
`;

const StyledContent = styled.div<{isMenuOpen: boolean}>`
    position: relative;
    opacity: 1;
    transition: opacity 0.4s ease-in;
    ${props => props.isMenuOpen && css`
        opacity: 0.7;
    `}
`

const StyledEyeContainer = styled.div<{ top: string, left: string }>`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
`

export default function SkillsPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const eyeGlTf = useGLTF('/exp/models/eye/scene.gltf') as EyeGLTFResult;
    const {scrollYProgress} = useViewportScroll();
    const rColorChannel = useTransform(scrollYProgress, [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1], [255, 255, 0, 0, 0, 0, 255, 255]);
    const gColorChannel = useTransform(scrollYProgress, [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1], [255, 255, 255, 255, 255, 255, 0, 0]);
    const bColorChannel = useTransform(scrollYProgress, [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1], [255, 255, 255, 255, 0, 0, 255, 255]);
    const backgroundColor = useMotionTemplate`rgba(${rColorChannel},${gColorChannel},${bColorChannel})`

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <StyledRoot
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
            style={{
                backgroundColor
            }}
        >
            <PageLoader isLoadFinished={isLoadFinished}>
                <Page
                    onMenuToggle={setIsMenuOpen}
                >
                    <StyledBanner>
                        <ThreeSetup
                            color={"white"}
                            controlButtons={<CameraControlButtons pageVariant={true} inverse={true}/>}
                            onLoadFinished={() => setIsLoadFinished(true)}
                        >
                            <SkillsPageWorld
                                eyeGltf={eyeGlTf}
                            />
                        </ThreeSetup>
                    </StyledBanner>

                    <StyledContent
                        isMenuOpen={isMenuOpen}
                    >
                        <PageContentLayout>
                            <StyledText>
                                <LayoutTextSection>
                                    <GlitchText
                                        variant={"flip"}
                                        text={`During my work as a frontend developer I’ve been using different technologies and frameworks, mostly based somewhere in the Javascript world.`}/>
                                    <br/>
                                    <GlitchText
                                        variant={"flip"}
                                        text={`Most of all I’m drawn to technologies that support creative processes and open possibilities to unusual or unseen results.`}/>

                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText
                                            variant={"flip"}
                                            text={"Favorite Frameworks"}
                                        />
                                    </h1>
                                    <LayoutTextItem>React</LayoutTextItem>
                                    <LayoutTextItem>Three.js</LayoutTextItem>
                                    <LayoutTextItem>R3F</LayoutTextItem>
                                    <LayoutTextItem>Styled Components</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText
                                            variant={"flip"}
                                            text={"Familiar Frameworks"}
                                        />
                                    </h1>
                                    <LayoutTextItem>Angular</LayoutTextItem>
                                    <LayoutTextItem>Framer Api</LayoutTextItem>
                                    <LayoutTextItem>Next.js</LayoutTextItem>
                                    <LayoutTextItem>Immer.js</LayoutTextItem>
                                    <LayoutTextItem>Electron</LayoutTextItem>
                                    <LayoutTextItem>Draft.js</LayoutTextItem>
                                    <LayoutTextItem>Material UI</LayoutTextItem>
                                    <LayoutTextItem>Jest</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText
                                            variant={"flip"}
                                            text={"Obviously, the basics"}
                                        />
                                    </h1>
                                    <LayoutTextItem>Plain JS</LayoutTextItem>
                                    <LayoutTextItem>Html/CSS/SCSS</LayoutTextItem>
                                    <LayoutTextItem>command-line/git</LayoutTextItem>
                                    {/*<LayoutItem>jQuery <span role={"img"} aria-label={"skull"}>&#128128;</span></LayoutItem>*/}
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText
                                            variant={"flip"}
                                            text={"Favorite Languages"}
                                        />
                                    </h1>
                                    <LayoutTextItem>JS</LayoutTextItem>
                                    <LayoutTextItem>Typescript</LayoutTextItem>
                                    <LayoutTextItem>Python</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText
                                            variant={"flip"}
                                            text={"Other Skills"}
                                        />
                                    </h1>
                                    <LayoutTextItem>Solid understanding of contemporary UI and UX
                                        concepts</LayoutTextItem>
                                    <LayoutTextItem>Basics in the fields of Artificial Intelligence, Machine Learning &
                                        Deep
                                        Learning</LayoutTextItem>
                                    {/*<LayoutItem>Natural Language Processing & Linguistics</LayoutItem>*/}
                                    {/*<LayoutItem>Maths & Logic</LayoutItem>*/}
                                    <LayoutTextItem>Solid English + German</LayoutTextItem>
                                </LayoutTextSection>
                            </StyledText>
                        </PageContentLayout>


                        <StyledEyeContainer top={"20%"} left={"5%"}>
                            <SmallEye
                                z={-300}
                                gltf={eyeGlTf}
                            />
                        </StyledEyeContainer>

                        <StyledEyeContainer top={"30%"} left={"80%"}>
                            <SmallEye
                                z={-400}
                                gltf={eyeGlTf}
                            />
                        </StyledEyeContainer>

                        <StyledEyeContainer top={"45%"} left={"29%"}>
                            <SmallEye
                                z={-250}
                                gltf={eyeGlTf}
                            />
                        </StyledEyeContainer>

                        <StyledEyeContainer top={"60%"} left={"70%"}>
                            <SmallEye
                                z={-500}
                                gltf={eyeGlTf}
                            />
                        </StyledEyeContainer>

                        <StyledEyeContainer top={"75%"} left={"8%"}>
                            <SmallEye
                                z={-270}
                                gltf={eyeGlTf}
                            />
                        </StyledEyeContainer>

                        <StyledEyeContainer top={"90%"} left={"75%"}>
                            <SmallEye
                                gltf={eyeGlTf}
                                z={-300}
                            />
                        </StyledEyeContainer>

                    </StyledContent>
                </Page>
            </PageLoader>
        </StyledRoot>
    );
}

useGLTF.preload("/exp/models/eye/scene.gltf");