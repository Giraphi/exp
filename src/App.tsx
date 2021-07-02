import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import ThreeCanvas from "./components/three-canvas";
import GlobalStyle from "./style/global-style";
import MovementContextProvider from "./contexts/providers/movement-context-provider";
import CameraControlButtons from "./components/camera-control-buttons";
import DeviceContextProvider from "./contexts/providers/device-context-provider";
import "./style/font-faces.css";

const StyledRoot = styled.div`
    background-color: black;
    width: 100%;
    height: 100%;
    position: relative;
`

// Workaround to make the font available as a texture in lightbulb.tsx
const StyledFontWorkaround = styled.div`
    font-family: "AuvantGothicBold", sans-serif;
    position: absolute;
    z-index: -99;
`

function App() {
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        setIsFirstRender(false);
    }, [])

    return (
        <StyledRoot>
            {isFirstRender &&
                <StyledFontWorkaround>TEXT</StyledFontWorkaround>
            }
            <GlobalStyle/>
            <DeviceContextProvider>
                <MovementContextProvider>
                    <ThreeCanvas/>
                    <CameraControlButtons/>
                </MovementContextProvider>
            </DeviceContextProvider>
        </StyledRoot>
    )
}

export default App;