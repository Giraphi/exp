import React, { useState } from "react";
import styled from "styled-components";
import ThreeSetup from "../../three-setup/three-setup";
import CameraControlButtons from "../../camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import LayoutContent from "../../utilities/layout-content";
import { motion, useTransform, useViewportScroll } from "framer-motion";
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
    z-index: ${zIndexes.pageText};

    @media (min-width: 768px) {
        text-align: center;
    }
`;

const StyledContent = styled.div`
    position: relative;
`;

export default function SkillsPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);
    const eyeGlTf = useGLTF("exp/models/eye/scene.gltf") as EyeGLTFResult;
    const { scrollYProgress } = useViewportScroll();

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 2 / 8, 3 / 8, 4 / 8, 5 / 8, 6 / 8, 7 / 8, 1],
        ["#ffffff", "#ffffff", "#ff00ff", "#ff00ff", "#00ffff", "#00ffff", "#00ff00", "#00ff00"]
    );

    return (
        <PageLoader isLoadFinished={isLoadFinished}>
            <StyledRoot
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }}
                style={{
                    backgroundColor,
                }}
            >
                <Page>
                    <StyledBanner>
                        <ThreeSetup
                            color={"white"}
                            controlButtons={<CameraControlButtons isMinimal={true} inverse={true} />}
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
                                    <LayoutTextItem>React-Three-Fiber</LayoutTextItem>
                                    <LayoutTextItem>Framer Motion</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Familiar Frameworks"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>Angular</LayoutTextItem>
                                    <LayoutTextItem>Next.js</LayoutTextItem>
                                    <LayoutTextItem>Immer.js</LayoutTextItem>
                                    <LayoutTextItem>Electron</LayoutTextItem>
                                    <LayoutTextItem>Draft.js</LayoutTextItem>
                                    <LayoutTextItem>Jest</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Styling Systems"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>CSS / SCSS</LayoutTextItem>
                                    <LayoutTextItem>CSS-in-JS approaches</LayoutTextItem>
                                    <LayoutTextItem>styled-components</LayoutTextItem>
                                    <LayoutTextItem>Material UI</LayoutTextItem>
                                </LayoutTextSection>

                                <LayoutTextSection>
                                    <h1>
                                        <GlitchText variant={"flip"} text={"Fundamentals"} probability={0.004} />
                                    </h1>
                                    <LayoutTextItem>Plain JS / Html / CSS</LayoutTextItem>
                                    <LayoutTextItem>command-line / git / npm / yarn etc.</LayoutTextItem>
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
                        {/*<SkillsPageDots/>*/}
                        <Footer />
                    </StyledContent>
                </Page>
            </StyledRoot>
        </PageLoader>
    );
}

useGLTF.preload("exp/models/eye/scene.gltf");
