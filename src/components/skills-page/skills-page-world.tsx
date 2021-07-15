import React, {Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import Lightbulb from "../shared/lightbulb";
import {Vector3} from "three/src/math/Vector3";
import ManModel from "./man-model";
import SkillsPageCuboids from "./skills-page-cuboids";
import {colorSkills} from "../../style/constants";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();
    const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);

    const lightbulbPosition = useMemo(() => {
        return new Vector3(-windowWidth / 5, 220, 0);
    }, [windowWidth]);

    return (
        <>
            {/*<ambientLight color="white" intensity={0.03}/>*/}
            <pointLight
                color={colorSkills}
                intensity={2}
                distance={1000}
                decay={1}
                position={[420, 1000, 40]}
                castShadow={true}
            />

            <SkillsPageCuboids
                numCuboids={50}
                worldSize={1000}
                lift={isLightbulbClicked}
            />

            <Lightbulb
                position={lightbulbPosition}
                text={"Back Home"}
                height={95}
                path={"/home"}
                horizontal={true}
                onClick={() => setIsLightbulbClicked(true)}
                lightParams={{
                    inner: {
                        decay: 2,
                        distance: 450,
                        intensity: 1
                    }
                }}
            />

            <Suspense fallback={null}>
            <ManModel/>
            </Suspense>
        </>
    );
}

