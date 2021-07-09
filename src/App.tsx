import React from 'react'
import styled from "styled-components";

import GlobalStyle from "./style/global-style";

import DeviceContextProvider from "./contexts/providers/device-context-provider";
import "./style/font-faces.css";
import ThreePage from "./pages/three-page/three-page";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SkillsPage from "./pages/skills-page/skills-page";

const StyledRoot = styled.div`
    //width: 100%;
    //height: 100%;
    //position: relative;
`

function App() {
    return (
        <StyledRoot>
            <GlobalStyle/>
            <DeviceContextProvider>

                <BrowserRouter basename={"exp"}>
                    <Switch>
                        <Route
                            key={0}
                            exact
                            path={["/", `/home`]}
                        >
                            <ThreePage/>
                        </Route>

                        <Route
                            key={1}
                            exact
                            path={["/skills"]}
                        >
                            <SkillsPage/>
                        </Route>
                    </Switch>
                </BrowserRouter>

            </DeviceContextProvider>
        </StyledRoot>
    )
}

export default App;