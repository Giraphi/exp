import React, {useState} from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import {breakpointSmall, colorSkills} from "../../style/constants";
import GlitchText from "./glitch-text/glitch-text";
import PageLoader from "../page-loader/page-loader";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    //color: ${colorSkills};
    overflow: auto;

    user-select: none;
    @media (min-width: ${breakpointSmall}) {
        user-select: auto;
    }
`

const StyledBanner = styled.div`
    height: 120vh;
`

const StyledText = styled.div`
    text-align: center;
    font-family: "AuvantGothicBold", sans-serif;
    color: black;
    margin-bottom: 75px;

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

const StyledTextBlock = styled.div`
    margin-bottom: 50px;
    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 7vh;
    }  
`

const StyledContent = styled.div`
    position: relative;
    top: -40vh;

    @media (min-width: ${breakpointSmall}) {
        top: -45vh;
    }
`

export default function SkillsPage() {
    const [isLoadFinished, setIsLoadFinished] = useState(false);

    return (
        <StyledRoot
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <PageLoader isLoadFinished={isLoadFinished}>
                <StyledBanner>
                    <ThreeBaseline
                        color={"white"}
                        controlButtons={<CameraControlButtons pageVariant={true} inverse={true}/>}
                        onLoadFinished={() => setIsLoadFinished(true)}
                    >
                        <SkillsPageWorld/>
                    </ThreeBaseline>
                </StyledBanner>

                <StyledContent>
                    <PageContentLayout>
                        <StyledText>
                            <StyledTextBlock>
                                <GlitchText
                                    text={`During my work as a frontend developer I’ve been using many different technologies and frameworks, mostly based somewhere in the Javascript world.`}/>
                                <br/>
                                <GlitchText
                                    text={`Most of all I’m drawn to technologies that support creative processes and open possibilities to unusual or unseen results.`}/>

                            </StyledTextBlock>

                            <StyledTextBlock>
                                <h1>
                                    <GlitchText
                                        style={"h1"}
                                        text={"Favorite Frameworks"}
                                    />
                                </h1>
                                <StyledItem>React</StyledItem>
                                <StyledItem>Three.js</StyledItem>
                                <StyledItem>R3F</StyledItem>
                                <StyledItem>Styled Components</StyledItem>
                            </StyledTextBlock>

                            <StyledTextBlock>
                                <h1>
                                    <GlitchText
                                        style={"h1"}
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
                            </StyledTextBlock>

                            <StyledTextBlock>
                                <h1>
                                    <GlitchText
                                        style={"h1"}
                                        text={"Obviously, the basics"}
                                    />
                                </h1>
                                <StyledItem>Plain JS</StyledItem>
                                <StyledItem>Html/CSS/SCSS</StyledItem>
                                <StyledItem>command-line/git</StyledItem>
                                {/*<StyledItem>jQuery <span role={"img"} aria-label={"skull"}>&#128128;</span></StyledItem>*/}
                            </StyledTextBlock>

                            <StyledTextBlock>
                                <h1>
                                    <GlitchText
                                        style={"h1"}
                                        text={"Favorite Languages"}
                                    />
                                </h1>
                                <StyledItem>JS</StyledItem>
                                <StyledItem>Typescript</StyledItem>
                                <StyledItem>Python</StyledItem>
                            </StyledTextBlock>

                            <StyledTextBlock>
                                <h1>
                                    <GlitchText
                                        style={"h1"}
                                        text={"Other Skills"}
                                    />
                                </h1>
                                <StyledItem>Solid understanding of contemporary UI and UX concepts</StyledItem>
                                <StyledItem>Basics in the fields of Artificial Intelligence, Machine Learning & Deep
                                    Learning</StyledItem>
                                {/*<StyledItem>Natural Language Processing & Linguistics</StyledItem>*/}
                                {/*<StyledItem>Maths & Logic</StyledItem>*/}
                                <StyledItem>Solid English + German</StyledItem>
                            </StyledTextBlock>
                        </StyledText>
                    </PageContentLayout>
                </StyledContent>
            </PageLoader>
        </StyledRoot>
    );
}