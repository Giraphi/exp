import React, {useEffect} from "react";
import ThreeSetup from "../../three-setup/three-setup";
import StartPageWorld from "./start-page-world";
import CameraControlButtons from "../../camera-control-buttons";
import styled from "styled-components";
import {motion} from "framer-motion";
import {breakpointSmall} from "../../../style/constants";

const StyledRoot = styled(motion.div)`
    height: 100vh;
    background-color: black;
    padding-bottom: 70px;
    position: relative;
    
    @media (min-width: 768px) {
        padding-bottom: 0;
    }
`

const StyledHeadlineContainer = styled.div`
    position: absolute;
    top: 0;
    color: white;
    z-index: 1;
    padding-left: 2vh;
    padding-top: 2vh;
`

const StyledHeadline = styled.div`
    margin-bottom: 0;
    
    font-size: 40px;
    
    @media(min-width: ${breakpointSmall}) {        
        font-size: 70px;
    }
`

const StyledSubHeadline = styled.div`
    font-size: 17px;
    letter-spacing: 13px;
    margin-top: -10px;
    margin-left: 3px;

    @media(min-width: ${breakpointSmall}) {
        font-size: 30px;
        letter-spacing: 22px;
        margin-top: -20px;
        margin-left: 6px;
    }
`


export default function StartPage() {
    useEffect(() => {
        document.body.classList.add("is-start-page");
        return () => document.body.classList.remove("is-start-page");
    }, [])

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <StyledHeadlineContainer>
                <StyledHeadline>
                    RAPHAEL HÖPS
                </StyledHeadline>
                <StyledSubHeadline>
                    Web Developer
                </StyledSubHeadline>
            </StyledHeadlineContainer>
                <ThreeSetup
                    color={"black"}
                    controlButtons={<CameraControlButtons/>}
                >
                    <StartPageWorld
                        numCuboids={170}
                        size={1000}
                    />
                </ThreeSetup>
        </StyledRoot>
    )

}