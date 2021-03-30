import React from 'react'
import styled from "styled-components";
import ThreeCanvas from "./components/three-canvas";
import GlobalStyle from "./global-style";
import MovementContextProvider from "./contexts/providers/movement-context-provider";
import CameraControlElements from "./components/camera-control-elements";


const StyledRoot = styled.div`
  //background: #ff6161;
  //background: #53FAEB;
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
`

function App() {
  return (
      <StyledRoot>
          <GlobalStyle/>

          <MovementContextProvider>
            <ThreeCanvas/>
            <CameraControlElements/>
          </MovementContextProvider>
      </StyledRoot>
  )
}

export default App;