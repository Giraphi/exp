import React from "react";
import { Spacer } from "../../utilities/spacer";
import LayoutContent from "../../utilities/layout-content";
import styled from "styled-components";

const StyledRoot = styled.div`
    a {
        color: black !important;
    }
`;

export default function CreditsPage() {
    return (
        <StyledRoot>
            <LayoutContent>
                <Spacer size={"medium"} />

                <h1>About this website</h1>
                <div>Ideas, styling and development by Raphael Höps in 2021.</div>
                <Spacer size={"small"} />

                <div>Coded from scratch using react, R3F/three.js, framer motion and other frameworks.</div>
                <Spacer size={"small"} />
                <div>
                    3D Models generated by own own scannings resp. downloaded from <a href={"https://sketchfab.com"}>sktechfab</a>.
                </div>
                <Spacer size={"medium"} />

                <h1>Credits</h1>
                <h2>Eyeball Model</h2>
                <div>
                    Model based on &ldquo;
                    <a
                        href={
                            "https://sketchfab.com/3d-models/free-model-of-the-month-anatomical-eye-ball-281784b8e6ff4713991cdee224f07b09"
                        }
                    >
                        Free model of the month - Anatomical Eye ball
                    </a>
                    &rdquo; by <a href={"https://sketchfab.com/assetfactory"}>assetfactory</a> licensed under{" "}
                    <a href={"http://creativecommons.org/licenses/by/4.0/"}>CC-BY-4.0</a>.
                </div>
                <Spacer size={"medium"} />

                <h2>Hand Model</h2>
                <div>
                    Model based on &ldquo;<a href={"https://sketchfab.com/3d-models/hand-a43c9c9059b24e2aa4af08d1a76f0916"}>hand</a>&rdquo;
                    by <a href={"https://sketchfab.com/kevinruiz"}>kevinruiz</a> licensed under{" "}
                    <a href={"http://creativecommons.org/licenses/by/4.0/"}>CC-BY-4.0</a>.
                </div>
                <Spacer size={"medium"} />
            </LayoutContent>
        </StyledRoot>
    );
}
