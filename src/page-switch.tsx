import React from "react";
import {AnimatePresence} from "framer-motion";
import {Route, Switch, useLocation} from "react-router-dom";
import ThreePage from "./pages/three-page/three-page";
import SkillsPage from "./pages/skills-page/skills-page";

export default function PageSwitch() {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Switch
                location={location}
                key={location.pathname}
            >
                <Route
                    exact
                    path={["/", `/home`]}
                >
                    <ThreePage/>
                </Route>

                <Route
                    exact
                    path={["/skills"]}
                >
                    <SkillsPage/>
                </Route>
            </Switch>
        </AnimatePresence>
    );
}