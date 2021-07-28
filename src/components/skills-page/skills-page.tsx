import React, {useRef} from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import {breakpointSmall, colorSkills} from "../../style/constants";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    color: ${colorSkills};
    //background-color: black;
    overflow: auto;
`

const StyledBanner = styled.div`
    height: 75vh;

    @media(min-width: ${breakpointSmall}) {
        height: 80vh;
    }
`

const StyledText = styled.div`
    text-align: center;
    font-family: "AuvantGothicBold", sans-serif;
    color: black;
    margin-bottom: 75px;
    user-select: none;
    -webkit-touch-callout: none;
    
    @media(min-width: 768px) {
        margin-top: 10px;
    }
`;

const StyledItem = styled.div`
    margin-bottom: 5px;
`

const StyledTextBlock = styled.div`
    margin-bottom: 50px;
    @media(min-width: ${breakpointSmall}) {
        margin-bottom: 10vh;
    }
`

export default function SkillsPage() {
    const bannerRef = useRef<HTMLDivElement>(null);

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <StyledBanner
                ref={bannerRef}
            >
                <ThreeBaseline
                    color={"white"}
                    controlButtons={<CameraControlButtons minimal={true} inverse={true}/>}
                >
                    <SkillsPageWorld
                        bannerRef={bannerRef}
                    />
                </ThreeBaseline>
            </StyledBanner>

            <PageContentLayout>
                <StyledText>
                    <StyledTextBlock>
                        <h1>Favorite JS Frameworks</h1>
                        <StyledItem>React</StyledItem>
                        <StyledItem>Three.js</StyledItem>
                        <StyledItem>R3F</StyledItem>
                        <StyledItem>Styled Components</StyledItem>
                    </StyledTextBlock>

                    <StyledTextBlock>
                        <h1>Familiar JS Frameworks</h1>
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
                        <h1>Obviously, the Basics</h1>
                        <StyledItem>Plain JS</StyledItem>
                        <StyledItem>Html/CSS/SCSS</StyledItem>
                        <StyledItem>command-line/git</StyledItem>
                        <StyledItem>jQuery <span role={"img"} aria-label={"skull"}>&#x2620;</span></StyledItem>
                    </StyledTextBlock>

                    <StyledTextBlock>
                        <h1>Favorite Languages</h1>
                        <StyledItem>JS</StyledItem>
                        <StyledItem>Typescript</StyledItem>
                        <StyledItem>Python</StyledItem>
                    </StyledTextBlock>

                    <StyledTextBlock>
                        <h1>Other Skills</h1>
                        <StyledItem>Solid English + German</StyledItem>
                        <StyledItem>Basics in Machine Learning and Deep Learning</StyledItem>
                        <StyledItem>Basics in Natural Language Processing and Linguistics</StyledItem>
                    </StyledTextBlock>


                </StyledText>
            </PageContentLayout>
        </StyledRoot>
    );
}