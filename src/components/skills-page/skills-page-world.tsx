import React, {Suspense, useState} from "react";
import {colorSkills} from "../../style/constants";
import SkillsPageHeadline from "./skills-page-headline";
import EyeModel from "./eye-model";
import FlyingPageObjects from "../shared/flying-page-objects";
import PageMenu from "../shared/page-menu";
import useDevice from "../../hooks/use-device";

export default function SkillsPageWorld() {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();

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
                    castShadow={true}
                >
                </pointLight>

                <pointLight
                    color={"white"}
                    intensity={0.9}
                    distance={500}
                    decay={1}
                    position={[0, 0, 0]}
                    castShadow={true}
                >
                </pointLight>

                <group
                    position={device === "small" ? [0,60,-200] : [0,30, -200]}
                >
                    <FlyingPageObjects
                        numObjects={150}
                        worldSize={1000}
                        lift={isMenuClicked}
                    >
                        <sphereGeometry
                            attach="geometry"
                            args={[5, 32, 32]}
                        />
                    </FlyingPageObjects>
                </group>


                <Suspense fallback={null}>
                    <EyeModel/>
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

