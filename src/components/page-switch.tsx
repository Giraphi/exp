import React, {Suspense} from "react";
import {AnimatePresence} from "framer-motion";
import {Route, Switch, useLocation} from "react-router-dom";
import StartPage from "./start-page/start-page";
import SkillsPage from "./skills-page/skills-page";
import AboutPage from "./about-page/about-page";
import MousePositionContextProvider from "../contexts/providers/mouse-position-context-provider";

export default function PageSwitch() {
    const location = useLocation();

    return (
        <MousePositionContextProvider>
            <AnimatePresence
                exitBeforeEnter
                initial={false}
            >
                <Switch
                    location={location}
                    key={location.pathname}
                >
                    <Route
                        exact
                        path={["/", `/home`]}
                    >
                        <StartPage/>
                    </Route>

                    <Route
                        exact
                        path={["/skills"]}
                    >
                        <Suspense fallback={null}>
                            <SkillsPage/>
                        </Suspense>
                    </Route>

                    <Route
                        exact
                        path={["/about"]}
                    >
                        <AboutPage/>
                    </Route>
                </Switch>
            </AnimatePresence>
        </MousePositionContextProvider>
    );
}