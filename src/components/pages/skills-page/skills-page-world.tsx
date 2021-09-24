import React, {Suspense, useContext, useState} from "react";
import {colorSkills} from "../../../style/constants";
import SkillsPageHeadline from "./skills-page-headline";
import MovingEye from "./moving-eye";
import FlyingPageObjects from "../../flying-page-objects";
import PageMenu from "../../page-menu";
import useDevice from "../../../hooks/use-device";
import {EyeGLTFResult} from "../../models/eye-model";
import {PerformanceContext, Performances} from "../../../contexts/performance-context";

export interface SkillsPageWorldProps {
    eyeGltf: EyeGLTFResult;
}

export default function SkillsPageWorld(props: SkillsPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();
    const performance = useContext(PerformanceContext).performance;

    return (
        <>
            <group
                position={device === "small" ? [0, -50, -250] : [0, 10, -400]}
            >
                <SkillsPageHeadline/>

                <ambientLight color="white" intensity={0.05}/>


                <pointLight
                    color={colorSkills}
                    intensity={2}
                    distance={1200}
                    decay={1}
                    position={[420, 1000, 40]}
                    castShadow={performance >= Performances.high}
                >
                </pointLight>

                <pointLight
                    color={"white"}
                    intensity={0.9}
                    distance={500}
                    decay={1}
                    position={[0, 0, 0]}
                    castShadow={performance >= Performances.high}
                >
                </pointLight>

                <group
                    position={device === "small" ? [0,60,-200] : [0,30, -200]}
                >
                    {performance >= Performances.high &&
                        <FlyingPageObjects
                            numObjects={150}
                            worldSize={1000}
                            lift={isMenuClicked}
                        >
                            <meshStandardMaterial
                                attach="material"
                                color="white"
                            />
                            <sphereGeometry
                                attach="geometry"
                                args={[5, 32, 32]}
                            />
                        </FlyingPageObjects>
                    }
                </group>

                <Suspense fallback={null}>
                    <MovingEye
                        eyeGltf={props.eyeGltf}
                    />
                </Suspense>
            </group>

            <group
                position={device === "small" ? [0, 30, -250] : [0, 10, -400]}
            >
                <PageMenu
                    negative={true}
                    onClick={() => setIsMenuClicked(true)}
                />
            </group>
        </>
    );
}

