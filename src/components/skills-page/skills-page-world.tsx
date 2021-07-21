import React, {Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import Lightbulb from "../shared/lightbulb";
import {Vector3} from "three/src/math/Vector3";
import SkillsPageFlyingObjects from "./skills-page-cuboids";
import {colorSkills} from "../../style/constants";
import useDevice from "../../hooks/use-device";
import SkillsPageHeadline from "./skills-page-headline";
import EyeModel from "./eye-model";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();
    const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);
    const device = useDevice()

    const lightbulbPosition = useMemo(() => {
        if (device !== "small") {
            return new Vector3(-windowWidth / 6, 180, 0);
        }
        return new Vector3(-windowWidth / 4, 180, 100);

    }, [device, windowWidth]);

    return (
        <>
            {/*<ambientLight color="white" intensity={0.01}/>*/}
            {/*<ambientLight color="white" intensity={0.05}/>*/}

            <SkillsPageHeadline/>

            <pointLight
                color={colorSkills}
                intensity={2}
                distance={1200}
                decay={1}
                position={[420, 1000, 40]}
                castShadow={true}
            >
            </pointLight>

            <SkillsPageFlyingObjects
                numObjects={150}
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
                        decay: 1.5,
                        distance: 650,
                        intensity: 1
                    }
                }}
            />

            <Suspense fallback={null}>
                <EyeModel/>
                {/*<ManModel/>*/}
                {/*<TreeModel/>*/}
            </Suspense>
        </>
    );
}

