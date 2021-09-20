import React from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import {colorAbout} from "../../style/constants";
import PageContentLayout from "../shared/page-content-layout";
import {motion} from "framer-motion";
import AboutPageWorld from "./about-page-world";
import GlitchText from "../skills-page/glitch-text/glitch-text";

const StyledRoot = styled(motion.div)`
    min-height: 100vh;
    position: relative;
    color: ${colorAbout};
    background-color: black;
    overflow: auto;
`

const StyledBanner = styled.div`
    height: 75vh;

    @media (min-width: 768px) {
        height: 80vh;
    }
`

const StyledText = styled.div`
    font-family: "AuvantGothicBold", sans-serif;
    margin-bottom: 75px;

    @media (min-width: 768px) {
        margin-top: 10px;
    }
`;

const StyledTable = styled.table`
    td, table td * {
        vertical-align: top;
        padding: 0;
    }
    
    td {
        padding-bottom: 10px;
    }

    td:first-child {
        white-space: nowrap;
        padding-right: 15px;
        text-align: end;
    }

    @media (min-width: 768px) {
        td:first-child {
            padding-right: 35px;
        }
    }

`

const StyledLink = styled.a`
    color: ${colorAbout};
    text-decoration: underline;
    
    &:hover {
        text-decoration: line-through;
    }
`

export default function AboutPage() {
    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <StyledBanner>
                <ThreeBaseline
                    color={"black"}
                    controlButtons={<CameraControlButtons pageVariant={true}/>}
                >
                    <AboutPageWorld/>
                </ThreeBaseline>
            </StyledBanner>

            <PageContentLayout>
                <StyledText>
                    <h1><GlitchText text={"Education"} variant={"color"}/></h1>
                    <p>
                        <StyledTable>
                            <tr>
                                <td><GlitchText text={"2011 - 2014"} variant={"color"}/></td>
                                <td><GlitchText text={"Bachelor Computer Science at TU Dresden"} variant={"color"}/>
                                </td>
                            </tr>
                            <tr>
                                <td><GlitchText text={"2015 - 2018"} variant={"color"}/></td>
                                <td><GlitchText
                                    text={"Master Computational Linguistics with Computer Science Minor at LMU Munich"}
                                    variant={"color"}/></td>
                            </tr>
                        </StyledTable>
                    </p>


                    <h1>Employments</h1>
                    <p>
                        <StyledTable>
                            <tr>
                                <td><GlitchText text={"2012 - 2018"} variant={"color"}/></td>
                                <td><GlitchText text={"Different Jobs as academic tutor at TU Dresden and LMU Munich."}
                                                variant={"color"}/></td>
                            </tr>
                            <tr>
                                <td><GlitchText text={"2016 - 2017"} variant={"color"}/></td>
                                <td><GlitchText text={"Working student at Siemens in Munich."} variant={"color"}/></td>
                            </tr>
                            <tr>
                                <td><GlitchText text={"2017"} variant={"color"}/></td>
                                <td>
                                    <GlitchText text={"Working student at the web agency"} variant={"color"}/>
                                    <StyledLink target={"_blank"} rel="noopener noreferrer"
                                       href={"http://www.funct.com"}>funct</StyledLink>
                                </td>
                            </tr>
                            <tr>
                                <td><GlitchText text={"Since 2018"} variant={"color"}/></td>
                                <td>
                                    <GlitchText text={"Full time web developer at"} variant={"color"}/>
                                    <StyledLink target={"_blank"} rel="noopener noreferrer"
                                       href={"http://www.funct.com"}>funct</StyledLink>
                                    <GlitchText text={" in Munich."} variant={"color"}/>
                                </td>
                            </tr>
                        </StyledTable>
                    </p>


                    <h1><GlitchText text={"Interests"} variant={"color"}/></h1>
                    <p>
                        <GlitchText text={"Art / Digital Art / Design"} variant={"color"}/><br/>
                        <GlitchText text={"Electronic music / Modular synthesizers"} variant={"color"}/><br/>
                        <GlitchText text={"Live music projects, e.g. synthesizer at my band project Bosch."}
                                    variant={"color"}/>
                    </p>

                    <h1><GlitchText text={"Contact"} variant={"color"}/></h1>
                    <p>
                        github<br/>
                        e-mail
                    </p>
                </StyledText>
            </PageContentLayout>
        </StyledRoot>
    );
}