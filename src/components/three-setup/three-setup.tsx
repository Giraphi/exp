import React, {ReactNode} from "react";
import MovementContextProvider from "../../contexts/providers/movement-context-provider";
import ThreeSetupCanvas from "./three-setup-canvas";
import styled from "styled-components";

const StyledRoot = styled.div<{backgroundColor: string}>`
    //background-color: ${props => props.backgroundColor};
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

export interface ThreeSetupProps {
    children: ReactNode;
    controlButtons: ReactNode;
    color: string;
    onLoadFinished?: () => void;
}

export default function ThreeSetup(props: ThreeSetupProps) {
    return (
        <StyledRoot
            backgroundColor={props.color}
        >
            <MovementContextProvider>

                <ThreeSetupCanvas
                    onLoadFinished={props.onLoadFinished}
                >
                    {props.children}
                </ThreeSetupCanvas>

                {props.controlButtons}
            </MovementContextProvider>

        </StyledRoot>
    );

}