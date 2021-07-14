import React, {ReactNode, useEffect, useState} from "react";
import MovementContextProvider from "../../../contexts/providers/movement-context-provider";
import ThreeBaselineCanvas from "./three-baseline-canvas";
import styled from "styled-components";
import {motion} from "framer-motion";

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


export interface ThreeBaselineProps {
    children: ReactNode;
    controlButtons: ReactNode;
}

export default function ThreeBaseline(props: ThreeBaselineProps) {

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, []);

    return (
        <StyledRoot
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1.0}}
        >
            <MovementContextProvider>
                {isFirstRender &&
                    <StyledFontWorkaround>TEXT</StyledFontWorkaround>
                }

                <ThreeBaselineCanvas>
                    {props.children}
                </ThreeBaselineCanvas>

                {props.controlButtons}
            </MovementContextProvider>

        </StyledRoot>
    );

}