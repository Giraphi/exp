import React, {useEffect, useState} from "react";
import MovementContextProvider from "../../contexts/providers/movement-context-provider";
import CameraControlButtons from "./components/camera-control-buttons";
import styled from "styled-components";
import ThreeCanvas from "./components/three-canvas";
import {AnimatePresence} from "framer-motion";


const StyledBackground = styled.div`
    background-color: black;
    height: 100vh;
`

// Workaround to make the font available as a texture in lightbulb.tsx
const StyledFontWorkaround = styled.div`
    font-family: "AuvantGothicBold", sans-serif;
    position: absolute;
    z-index: -99;
`

export default function ThreePage() {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    return (
        <AnimatePresence>
            <StyledBackground>

                <MovementContextProvider>

                    {isFirstRender &&
                        <StyledFontWorkaround>TEXT</StyledFontWorkaround>
                    }

                    <ThreeCanvas/>
                    <CameraControlButtons/>
                </MovementContextProvider>

            </StyledBackground>
        </AnimatePresence>
    );
}