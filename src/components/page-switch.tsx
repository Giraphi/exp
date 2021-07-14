import React from "react";
import {AnimatePresence} from "framer-motion";
import {Route, Switch, useLocation} from "react-router-dom";
import StartPage from "./start-page/start-page";
import SkillsPage from "./skills-page/skills-page";

export default function PageSwitch() {
    const location = useLocation();

    return (
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
                    <SkillsPage/>
                </Route>
            </Switch>
        </AnimatePresence>
    );
}