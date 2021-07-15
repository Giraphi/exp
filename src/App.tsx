import React from 'react'
import GlobalStyle from "./style/global-style";

import "./style/font-faces.css";
import {BrowserRouter} from "react-router-dom";
import PageSwitch from "./components/page-switch";
import styled from "styled-components";

const StyledRoot = styled.div`
    //background-color: black;
`

function App() {

    return (
        <StyledRoot>
            <GlobalStyle/>
                <BrowserRouter basename={"exp"}>
                    <PageSwitch/>
                </BrowserRouter>
        </StyledRoot>
    )
}

export default App;