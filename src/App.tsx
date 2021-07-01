import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import ThreeCanvas from "./components/three-canvas";
import GlobalStyle from "./global-style";
import MovementContextProvider from "./contexts/providers/movement-context-provider";
import CameraControlElements from "./components/camera-control-elements";


const StyledRoot = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
`

// Workaround to make the font available as a texture in lightbulb.tsx
const StyledFontWorkaround = styled.div`
    font-family: "AuvantGothicBold";
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
          <MovementContextProvider>
            <ThreeCanvas/>
            <CameraControlElements/>
          </MovementContextProvider>
      </StyledRoot>
    )
}

export default App;