import React, {ReactNode} from "react";
import MovementContextProvider from "../../../contexts/providers/movement-context-provider";
import ThreeBaselineCanvas from "./three-baseline-canvas";
import styled from "styled-components";

const StyledRoot = styled.div<{backgroundColor: string}>`
    background-color: ${props => props.backgroundColor};
    height: 100%;
    position: relative;
`

// // Workaround to make the font available as a texture in lightbulb.tsx
// const StyledFontWorkaround = styled.div`
//     font-family: "AuvantGothicBold", sans-serif;
//     position: absolute;
//     z-index: -99;
// `
//
// const StyledInkedBonesWorkaround = styled.div`
//     font-family: "InkedBones", sans-serif;
//     position: absolute;
//     z-index: -99;
// `

export interface ThreeBaselineProps {
    children: ReactNode;
    controlButtons: ReactNode;
    color: string;
}

export default function ThreeBaseline(props: ThreeBaselineProps) {
    return (
        <StyledRoot
            backgroundColor={props.color}
        >
            <MovementContextProvider>

                <ThreeBaselineCanvas>
                    {props.children}
                </ThreeBaselineCanvas>

                {props.controlButtons}
            </MovementContextProvider>

        </StyledRoot>
    );

}