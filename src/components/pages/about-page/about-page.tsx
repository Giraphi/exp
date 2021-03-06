import React, {useContext, useState} from "react";
import {Canvas} from "@react-three/fiber";
import styled from "styled-components";
import AboutPageContent from "./about-page-content";
import {useHistory} from "react-router-dom";
import MousePositionContext from "../../../contexts/mouse-position-context";
import {HistoryContext} from "../../../contexts/history-context";
import {colorAbout, zIndexes} from "../../../style/constants";
import Page from "../../page";
import Footer from "../../footer";
import AboutPageCanvas from "./about-page-canvas";
import PageLoader from "../../page-loader/page-loader";
import {motion} from "framer-motion";

const StyledMain = styled.div`
    position: relative;
    color: ${colorAbout};
    text-shadow: 2px 2px black;
`

const StyledCanvas = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    background: linear-gradient(black, deeppink 120%);

    &:hover {
        background-color: lime;
    }
`

const StyledSpace = styled.div`
    width: 100%;
    height: 64vh;
    pointer-events: none;
`;

const StyledContent = styled.div`
    position: relative;
    z-index: ${zIndexes.pageText};
`;

export default function AboutPage() {
    const history = useHistory();
    const mousePositionContext = useContext(MousePositionContext);
    const [isLoadFinished, setIsLoadFinished] = useState(false);

    return (
        <PageLoader isLoadFinished={isLoadFinished}>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1.0}}>
                <Page>
                    <StyledMain>
                        <StyledCanvas>
                            <Canvas>
                                <MousePositionContext.Provider value={mousePositionContext}>
                                    <HistoryContext.Provider value={{history}}>
                                        <AboutPageCanvas
                                            onLoadFinished={() => setIsLoadFinished(true)}
                                        />
                                    </HistoryContext.Provider>
                                </MousePositionContext.Provider>
                            </Canvas>
                        </StyledCanvas>

                        <StyledSpace/>

                        <StyledContent>
                            <AboutPageContent/>
                            <Footer isInverted={true}/>
                        </StyledContent>
                    </StyledMain>
                </Page>
            </motion.div>
        </PageLoader>
    );
}
