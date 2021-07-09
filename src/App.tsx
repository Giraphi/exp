import React from 'react'
import GlobalStyle from "./style/global-style";

import DeviceContextProvider from "./contexts/providers/device-context-provider";
import "./style/font-faces.css";
import {BrowserRouter} from "react-router-dom";
import PageSwitch from "./page-switch";

function App() {

    return (
        <>
            <GlobalStyle/>
            <DeviceContextProvider>

                <BrowserRouter basename={"exp"}>
                    <PageSwitch/>
                </BrowserRouter>

            </DeviceContextProvider>
        </>
    )
}

export default App;