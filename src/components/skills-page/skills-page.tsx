import React from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import StartPageWorld from "../start-page/start-page-world";

const StyledRoot = styled.div`
    min-height: 100vh;
    overflow:auto;
`

export default function SkillsPage() {
    return (
        <StyledRoot>
            <ThreeBaseline
                controlButtons={<CameraControlButtons/>}
            >
                <StartPageWorld
                    numCuboids={100}
                    size={1000}
                />
            </ThreeBaseline>
        </StyledRoot>
    );
}