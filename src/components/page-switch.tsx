import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import StartPage from "./pages/start-page/start-page";
import SkillsPage from "./pages/skills-page/skills-page";
import AboutPage from "./pages/about-page/about-page";
import MousePositionContextProvider from "../contexts/providers/mouse-position-context-provider";
import WorkPage from "./pages/work-page/work-page";
import CreditsPage from "./pages/other/credits-page";
import ImpressumPage from "./pages/other/impressum-page";
import PageLoader from "./page-loader/page-loader";
import TestPage from "./pages/test-page/test-page";

export default function PageSwitch() {
    const location = useLocation();

    return (
        <MousePositionContextProvider>
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                    <Route exact path={["/"]}>
                        <StartPage />
                    </Route>

                    <Route exact path={["/skills"]}>
                        <Suspense fallback={<PageLoader isLoadFinished={false}/>}>
                            <SkillsPage />
                        </Suspense>
                    </Route>

                    <Route exact path={["/about"]}>
                        <Suspense fallback={<PageLoader isLoadFinished={false}/>}>
                            <AboutPage />
                        </Suspense>
                    </Route>

                    <Route exact path={["/work"]}>
                        <Suspense fallback={<PageLoader isLoadFinished={false}/>}>
                            <WorkPage />
                        </Suspense>
                    </Route>

                    <Route exact path={["/credits"]}>
                        <CreditsPage />
                    </Route>

                    <Route exact path={["/impressum"]}>
                        <ImpressumPage />
                    </Route>

                    <Route exact path={["/test-page"]}>
                        <TestPage />
                    </Route>
                </Switch>
            </AnimatePresence>
        </MousePositionContextProvider>
    );
}
