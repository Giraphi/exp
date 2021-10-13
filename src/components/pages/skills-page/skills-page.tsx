import React, { useState } from "react";
import styled from "styled-components";
import ThreeSetup from "../../three-setup/three-setup";
import CameraControlButtons from "../../camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import LayoutContent from "../../utilities/layout-content";
import { motion, useMotionTemplate, useTransform, useViewportScroll } from "framer-motion";
import { breakpointSmall, zIndexes } from "../../../style/constants";
import GlitchText from "../../glitch-text/glitch-text";
import PageLoader from "../../page-loader/page-loader";
import { useGLTF } from "@react-three/drei";
import { EyeGLTFResult } from "../../models/eye-model";
import { LayoutTextItem } from "../../utilities/layout-text-item";
import Page from "../../page";
import { LayoutTextSection } from "../../utilities/layout-text-section";
import SkillsPageEyes from "./skills-page-eyes";
import Footer from "../../footer";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    overflow: auto;

    @media (min-width: ${breakpointSmall}) {
        user-select: auto;
    }
`;

const StyledBanner = styled.div`
    height: 75vh;
    margin-bottom: -10vh;

    @media (min-width: ${breakpointSmall}) {
        height: 80vh;
        margin-bottom: -10vh;
    }
`;

const StyledText = styled.div`
    color: black;
    position: relative;
    z-index: ${zIndexes.skillsPageText};

    @media (min-width: 768px) {
        text-align: center;
    }
`;

const StyledContent = styled.div`
    position: relative;
`;

export default function SkillsPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const eyeGlTf = useGLTF("/models/eye/scene.gltf") as EyeGLTFResult;
    const { scrollYProgress } = useViewportScroll();
    const rColorChannel = useTransform(scrollYProgress, [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1], [255, 255, 0, 0, 0, 0, 255, 255]);
    const gColorChannel = useTransform(
        scrollYProgress,
        [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1],
        [255, 255, 255, 255, 255, 255, 0, 0]
    );
    const bColorChannel = useTransform(
        scrollYProgress,
        [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1],
        [255, 255, 255, 255, 0, 0, 255, 255]
    );
    const backgroundColor = useMotionTemplate`rgba(${rColorChannel},${gColorChannel},${bColorChannel})`;

    return (
        <StyledRoot
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            style={{
                backgroundColor,
            }}
        >
            <PageLoader isLoadFinished={isLoadFinished}>
                <Page>
                    <StyledBanner>
                        <ThreeSetup
                            color={"white"}
                            controlButtons={<CameraControlButtons pageVariant={true} inverse={true} />}
                            onLoadFinished={() => setIsLoadFinished(true)}
                        >
                            <SkillsPageWorld eyeGltf={eyeGlTf} />
                        </ThreeSetup>
                    </StyledBanner>

                    <StyledContent>
                        <LayoutContent>
                            <StyledText>
                                <LayoutTextSection>
                                    <GlitchText
                                        probability={0.0015}
                                        variant={"flip"}
                                        text={`During my work as a frontend developer I’ve been using different technologies and frameworks, mostly based somewhere in the Javascript world.`}
                                    />
                                    <br />
                                    <br />
                                    <GlitchText
                                        probability={0.0015}
                                        variant={"flip"}
                                        text={`Most of all I’m drawn to technologies that support creative processes and open possibilities to unusual or unseen results.`}
                                    />
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Favorite Frameworks"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>React</LayoutTextItem>
                                    <LayoutTextItem>Three.js</LayoutTextItem>
                                    <LayoutTextItem>R3F</LayoutTextItem>
                                    <LayoutTextItem>Styled Components</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Familiar Frameworks"} probability={0.004} />
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
                                        <GlitchText variant={"flip"} text={"Obviously, the basics"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>Plain JS</LayoutTextItem>
                                    <LayoutTextItem>Html/CSS/SCSS</LayoutTextItem>
                                    <LayoutTextItem>command-line/git</LayoutTextItem>
                                    {/*<LayoutItem>jQuery <span role={"img"} aria-label={"skull"}>&#128128;</span></LayoutItem>*/}
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Favorite Languages"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>JavaScript</LayoutTextItem>
                                    <LayoutTextItem>TypeScript</LayoutTextItem>
                                    <LayoutTextItem>Python</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Other Skills"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>Solid understanding of contemporary UI and UX concepts.</LayoutTextItem>
                                    <LayoutTextItem>
                                        Expertise in the fields of Maths, Artificial Intelligence, Machine Learning & Deep Learning.
                                    </LayoutTextItem>
                                    <LayoutTextItem>Expertise in the fields of Natural Language Processing & Linguistics.</LayoutTextItem>
                                    <LayoutTextItem>Solid English + German.</LayoutTextItem>
                                </LayoutTextSection>
                            </StyledText>
                        </LayoutContent>

                        <SkillsPageEyes eyeGltf={eyeGlTf} />
                        <Footer />
                    </StyledContent>
                </Page>
            </PageLoader>
        </StyledRoot>
    );
}

useGLTF.preload("/models/eye/scene.gltf");
