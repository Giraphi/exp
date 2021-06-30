import React from 'react'
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

// const StyledTest = styled.div`
//     background-color: white;
//     font-family: "AuvantGothicBold";
// `

function App() {
  return (
      <StyledRoot>
          {/*<StyledTest>*/}
          {/*    TEST*/}
          {/*</StyledTest>*/}
          <h1>Test</h1>
          <GlobalStyle/>
          <MovementContextProvider>
            <ThreeCanvas/>
            <CameraControlElements/>
          </MovementContextProvider>
      </StyledRoot>
  )
}

export default App;