import React from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";

const StyledRoot = styled.div`
    min-height: 100vh;
    overflow:auto;
`

export default function SkillsPage() {
    return (
        <StyledRoot>
            <ThreeBaseline
                controlButtons={<CameraControlButtons minimal={true}/>}
            >
                <SkillsPageWorld/>
            </ThreeBaseline>
        </StyledRoot>
    );
}