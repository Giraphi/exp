import React, {useState} from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../shared/page-content-layout";
import {motion, useMotionTemplate, useTransform, useViewportScroll} from "framer-motion";
import {breakpointSmall} from "../../style/constants";
import GlitchText from "./glitch-text/glitch-text";
import PageLoader from "../page-loader/page-loader";
import {useGLTF} from "@react-three/drei";
import {EyeGLTFResult} from "../models/eye-model";
import SmallEye from "./small-eye";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    overflow: auto;

    user-select: none;
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
    z-index: 10;

    @media (min-width: 768px) {
        margin-top: 10px;
    }
`;

const StyledItem = styled.div`
    margin-bottom: 10px;
    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 1vh;
    }
`

// const p = styled.div`
//     margin-bottom: 50px;
//     @media (min-width: ${breakpointSmall}) {
//         margin-bottom: 7vh;
//     }
// `

const StyledContent = styled.div`
    position: relative;
`

const StyledEye = styled.div<{top: string, left: string}>`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
`

export default function SkillsPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const eyeGlTf = useGLTF('/exp/models/eye/scene.gltf') as EyeGLTFResult;
    const { scrollYProgress } = useViewportScroll();
    const rColorChannel = useTransform(scrollYProgress, [0, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8, 1], [255,255,  0,  0,  0,  0,255,255]);
    const gColorChannel = useTransform(scrollYProgress, [0, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8, 1], [255,255,255,255,255,255,  0,  0]);
    const bColorChannel = useTransform(scrollYProgress, [0, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8, 1], [255,255,255,255,  0,  0,255,255]);
    const backgroundColor = useMotionTemplate`rgba(${rColorChannel},${gColorChannel},${bColorChannel})`

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
                <StyledBanner>
                    <ThreeBaseline
                        color={"white"}
                        controlButtons={<CameraControlButtons pageVariant={true} inverse={true}/>}
                        onLoadFinished={() => setIsLoadFinished(true)}
                    >
                        <SkillsPageWorld
                            eyeGltf={eyeGlTf}
                        />
                    </ThreeBaseline>
                </StyledBanner>

                <StyledContent>
                    <PageContentLayout>
                        <StyledText>
                            <p>
                                <GlitchText
                                    variant={"flip"}
                                    text={`During my work as a frontend developer I’ve been using different technologies and frameworks, mostly based somewhere in the Javascript world.`}/>
                                <br/>
                                <GlitchText
                                    variant={"flip"}
                                    text={`Most of all I’m drawn to technologies that support creative processes and open possibilities to unusual or unseen results.`}/>

                            </p>

                            <p>
                                <h1>
                                    <GlitchText
                                        variant={"flip"}
                                        text={"Favorite Frameworks"}
                                    />
                                </h1>
                                <StyledItem>React</StyledItem>
                                <StyledItem>Three.js</StyledItem>
                                <StyledItem>R3F</StyledItem>
                                <StyledItem>Styled Components</StyledItem>
                            </p>

                            <p>
                                <h1>
                                    <GlitchText
                                        variant={"flip"}
                                        text={"Familiar Frameworks"}
                                    />
                                </h1>
                                <StyledItem>Angular</StyledItem>
                                <StyledItem>Framer Api</StyledItem>
                                <StyledItem>Next.js</StyledItem>
                                <StyledItem>Immer.js</StyledItem>
                                <StyledItem>Electron</StyledItem>
                                <StyledItem>Draft.js</StyledItem>
                                <StyledItem>Material UI</StyledItem>
                                <StyledItem>Jest</StyledItem>
                            </p>

                            <p>
                                <h1>
                                    <GlitchText
                                        variant={"flip"}
                                        text={"Obviously, the basics"}
                                    />
                                </h1>
                                <StyledItem>Plain JS</StyledItem>
                                <StyledItem>Html/CSS/SCSS</StyledItem>
                                <StyledItem>command-line/git</StyledItem>
                                {/*<StyledItem>jQuery <span role={"img"} aria-label={"skull"}>&#128128;</span></StyledItem>*/}
                            </p>

                            <p>
                                <h1>
                                    <GlitchText
                                        variant={"flip"}
                                        text={"Favorite Languages"}
                                    />
                                </h1>
                                <StyledItem>JS</StyledItem>
                                <StyledItem>Typescript</StyledItem>
                                <StyledItem>Python</StyledItem>
                            </p>

                            <p>
                                <h1>
                                    <GlitchText
                                        variant={"flip"}
                                        text={"Other Skills"}
                                    />
                                </h1>
                                <StyledItem>Solid understanding of contemporary UI and UX concepts</StyledItem>
                                <StyledItem>Basics in the fields of Artificial Intelligence, Machine Learning & Deep
                                    Learning</StyledItem>
                                {/*<StyledItem>Natural Language Processing & Linguistics</StyledItem>*/}
                                {/*<StyledItem>Maths & Logic</StyledItem>*/}
                                <StyledItem>Solid English + German</StyledItem>
                            </p>
                        </StyledText>
                    </PageContentLayout>


                    <StyledEye top={"20%"} left={"5%"}>
                        <SmallEye
                            z={-300}
                            gltf={eyeGlTf}
                        />
                    </StyledEye>

                    <StyledEye top={"30%"} left={"90%"}>
                        <SmallEye
                            z={-400}
                            gltf={eyeGlTf}
                        />
                    </StyledEye>

                    <StyledEye top={"45%"} left={"29%"}>
                        <SmallEye
                            z={-250}
                            gltf={eyeGlTf}
                        />
                    </StyledEye>

                    <StyledEye top={"60%"} left={"70%"}>
                        <SmallEye
                            z={-500}
                            gltf={eyeGlTf}
                        />
                    </StyledEye>

                    <StyledEye top={"75%"} left={"8%"}>
                        <SmallEye
                            z={-270}
                            gltf={eyeGlTf}
                        />
                    </StyledEye>

                    <StyledEye top={"90%"} left={"85%"}>
                        <SmallEye
                            gltf={eyeGlTf}
                            z={-300}
                        />
                    </StyledEye>

                </StyledContent>
            </PageLoader>
        </StyledRoot>
    );
}

useGLTF.preload("/exp/models/eye/scene.gltf");