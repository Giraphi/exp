import React from 'react'
import GlobalStyle from "./style/global-style";

import "./style/font-faces.css";
import {HashRouter} from "react-router-dom";
import PageSwitch from "./components/page-switch";
import styled from "styled-components";

const StyledRoot = styled.div`
    //background-color: black;
    //user-select: none;
`

function App() {
    // BrowserRouter is problematic with gh-pages:
    // https://stackoverflow.com/questions/58228017/react-router-v4-cant-load-page-on-github-pages
    return (
        <StyledRoot>
            <GlobalStyle/>
                <HashRouter>
                    <PageSwitch/>
                </HashRouter>
        </StyledRoot>
    )
}

export default App;