import React, {RefObject, Suspense, useState} from "react";
import {colorSkills} from "../../style/constants";
import SkillsPageHeadline from "./skills-page-headline";
import EyeModel from "./eye-model";
import FlyingPageObjects from "../shared/flying-page-objects";
import PageMenu from "../shared/page-menu";
import useDevice from "../../hooks/use-device";

export interface SkillsPageWorldProps {
    bannerRef: RefObject<HTMLDivElement>;
}

export default function SkillsPageWorld(props: SkillsPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();

    return (
        <>
            <group
                position={device === "small" ? [0, -50, -250] : [0, 10, -400]}
            >
                <SkillsPageHeadline/>

                <ambientLight color="white" intensity={0.1}/>


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
                    intensity={1}
                    distance={1200}
                    decay={1}
                    position={[0, 0, 200]}
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
                    <EyeModel
                        bannerRef={props.bannerRef}
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

