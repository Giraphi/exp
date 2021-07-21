import React, {RefObject, Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import Lightbulb from "../shared/lightbulb";
import {Vector3} from "three/src/math/Vector3";
import {colorSkills} from "../../style/constants";
import useDevice from "../../hooks/use-device";
import SkillsPageHeadline from "./skills-page-headline";
import EyeModel from "./eye-model";
import FlyingPageObjects from "../shared/flying-page-objects";

export interface SkillsPageWorldProps {
    bannerRef: RefObject<HTMLDivElement>;
}

export default function SkillsPageWorld(props: SkillsPageWorldProps) {
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

            <FlyingPageObjects
                numObjects={150}
                worldSize={1000}
                lift={isLightbulbClicked}
            >
                <sphereGeometry
                    attach="geometry"
                    args={[5, 32, 32]}
                />
            </FlyingPageObjects>

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
                <EyeModel
                    bannerRef={props.bannerRef}
                />
            </Suspense>
        </>
    );
}

