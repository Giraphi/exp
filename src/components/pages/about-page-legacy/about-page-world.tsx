import React, { Suspense, useState } from "react";
import { colorAbout } from "../../../style/constants";

import AboutPageHeadline from "./about-page-headline";
import PageMenu from "../../page-menu";
import { MeGLTFResult } from "../../models/me-model";
import AboutPageRotatingMe from "./about-page-rotating-me";
import ThreeSetupFlyingObjects from "../../three-setup/three-setup-flying-objects";

export interface AboutPageWorldProps {
    meGltf: MeGLTFResult;
}

export default function AboutPageWorld(props: AboutPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            <hemisphereLight intensity={0.06} />

            <AboutPageHeadline />

            <pointLight color={colorAbout} intensity={2} distance={1000} decay={1} position={[420, 1000, 40]} />

            <group position={[0, 0, -200]}>
                <ThreeSetupFlyingObjects numObjects={30} worldSize={1000} lift={isMenuClicked}>
                    <meshStandardMaterial attach="material" color="gray" />
                    <boxBufferGeometry args={[15, 15, 15]} />
                </ThreeSetupFlyingObjects>

                <Suspense fallback={null}>
                    <AboutPageRotatingMe meGltf={props.meGltf} />
                </Suspense>
            </group>

            <PageMenu onClick={() => setIsMenuClicked(true)} />
        </>
    );
}
