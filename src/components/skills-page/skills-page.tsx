import React, {useRef} from "react";
import styled from "styled-components";
import ThreeBaseline from "../shared/three-baseline/three-baseline";
import CameraControlButtons from "../shared/camera-control-buttons";
import SkillsPageWorld from "./skills-page-world";
import PageContentLayout from "../shared/page-content-layout";

const StyledRoot = styled.div`
    min-height: 100vh;
    position: relative;
    color: lime;
    background-color: black;
`

const StyledBanner = styled.div`
    height: 80vh;
`

export default function SkillsPage() {
    return (
        <StyledRoot>
            <StyledBanner>
                <ThreeBaseline
                    controlButtons={<CameraControlButtons minimal={true}/>}
                >
                    <SkillsPageWorld/>
                </ThreeBaseline>
            </StyledBanner>

            <PageContentLayout>
                <h1> TESTTEST</h1>
                <p>
                    <a href="http://www.google.com" target="_blank"  rel="noreferrer">link</a> TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>
                <p>
                    TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST TESTTEST
                </p>w
            </PageContentLayout>
        </StyledRoot>
    );
}