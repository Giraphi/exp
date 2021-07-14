import React from "react";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import styled from "styled-components";
import AboutPageWorld from "./about-page-world";

const StyledRoot = styled.div`
    min-height: 100vh;
    overflow:auto;
`


export default function AboutPage() {
    return (
        <StyledRoot>
            <ThreeBaseline
                controlButtons={<CameraControlButtons minimal={true}/>}
            >
                <AboutPageWorld/>
            </ThreeBaseline>
        </StyledRoot>
    );
}