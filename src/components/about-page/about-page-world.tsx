import React, {Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import TextureModel from "../shared/texture-model";
import useDevice from "../../hooks/use-device";
import {Vector3} from "three/src/math/Vector3";
import SkillsPageHeadline from "../skills-page/skills-page-headline";
import {colorAbout, colorSkills} from "../../style/constants";
import SkillsPageCuboids from "../skills-page/skills-page-cuboids";
import Lightbulb from "../shared/lightbulb";
import TreeModel from "./tree-model";
import AboutPageHeadline from "./about-page-headline";
import ManModel from "../skills-page/man-model";


export default function AboutPageWorld() {
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
            {/*<ambientLight color="white" intensity={0.005}/>*/}
            {/*<ambientLight color="white" intensity={0.05}/>*/}

            <AboutPageHeadline/>

            <pointLight
                color={colorAbout}
                intensity={2}
                distance={1000}
                decay={1}
                position={[420, 1000, 40]}
                castShadow={true}
            >
                {/*<mesh>*/}
                {/*    <meshStandardMaterial*/}
                {/*        emissive={sunColor}*/}
                {/*        emissiveIntensity={1}*/}
                {/*        color={"#000000"}*/}
                {/*    />*/}

                {/*    <sphereGeometry args={[5, 32, 32]}/>*/}
                {/*</mesh>*/}
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
                {/*<TreeModel/>*/}
            </Suspense>
        </>
    );
}