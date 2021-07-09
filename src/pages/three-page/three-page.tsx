import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import MovementContextProvider from "../../contexts/providers/movement-context-provider";
import ThreeCanvas from "./components/three-canvas";
import CameraControlButtons from "./components/camera-control-buttons";


const StyledRoot = styled(motion.div)`
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
            <StyledRoot
                initial={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1.5}}
            >
                <MovementContextProvider>

                    {isFirstRender &&
                        <StyledFontWorkaround>TEXT</StyledFontWorkaround>
                    }

                    <ThreeCanvas/>
                    <CameraControlButtons/>
                </MovementContextProvider>

            </StyledRoot>
    );
}