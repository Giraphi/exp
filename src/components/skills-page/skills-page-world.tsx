import React, {Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import Lightbulb from "../shared/lightbulb";
import {Vector3} from "three/src/math/Vector3";
import ManModel from "./man-model";
import SkillsPageCuboids from "./skills-page-cuboids";
import {colorSkills} from "../../style/constants";
import useDevice from "../../hooks/use-device";
import {Color} from "three";
import {Text} from "@react-three/drei";
import SkillsPageHeadline from "./skills-page-headline";



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

    const sunColor = useMemo(() => {
        return new Color(colorSkills);
    }, []);

    return (
        <>
            <ambientLight color="white" intensity={0.005}/>
            {/*<ambientLight color="white" intensity={0.05}/>*/}

            <SkillsPageHeadline/>

            <pointLight
                color={colorSkills}
                intensity={2}
                distance={1000}
                decay={1}
                position={[420, 1000, 40]}
                castShadow={true}
            >
                <mesh>
                    <meshStandardMaterial
                        emissive={sunColor}
                        emissiveIntensity={1}
                        color={"#000000"}
                    />

                    <sphereGeometry args={[5, 32, 32]}/>
                </mesh>
            </pointLight>

            <SkillsPageCuboids
                numCuboids={150}
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

