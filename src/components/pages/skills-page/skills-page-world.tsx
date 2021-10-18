import React, { Suspense, useState } from "react";
import { colorSkills } from "../../../style/constants";
import SkillsPageHeadline from "./skills-page-headline";
import MovingEye from "./moving-eye";
import FlyingPageObjects from "../../flying-page-objects";
import PageMenu from "../../page-menu";
import { EyeGLTFResult } from "../../models/eye-model";

export interface SkillsPageWorldProps {
    eyeGltf: EyeGLTFResult;
}

export default function SkillsPageWorld(props: SkillsPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            <SkillsPageHeadline />

            <ambientLight color="white" intensity={0.15} />

            <pointLight color={colorSkills} intensity={2} distance={1200} decay={1} position={[420, 1000, 40]} />

            <group position={[0, 0, -200]}>
                <FlyingPageObjects numObjects={140} worldSize={1000} lift={isMenuClicked}>
                    <meshStandardMaterial color="white" />
                    <sphereBufferGeometry args={[5, 32, 32]} />
                </FlyingPageObjects>

                <Suspense fallback={null}>
                    <MovingEye eyeGltf={props.eyeGltf} />
                </Suspense>
            </group>

            <PageMenu negative={true} onClick={() => setIsMenuClicked(true)} />
        </>
    );
}
