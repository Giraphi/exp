import React, { Suspense, useState } from "react";
import { colorAbout } from "../../../style/constants";
import FlyingPageObjects from "../../flying-page-objects";
import AboutPageHeadline from "./about-page-headline";
import PageMenu from "../../page-menu";
import { MeGLTFResult } from "../../models/me-model";
import AboutPageRotatingMe from "./about-page-rotating-me";

export interface AboutPageWorldProps {
    meGltf: MeGLTFResult;
}

export default function AboutPageWorld(props: AboutPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            <hemisphereLight intensity={0.05} />

            <AboutPageHeadline />

            <pointLight color={colorAbout} intensity={2} distance={1000} decay={1} position={[420, 1000, 40]} castShadow={true} />
            <pointLight color={"white"} intensity={0.3} distance={800} decay={1} position={[0, -50, 200]} castShadow={true} />

            <group position={[0, -50, 200]}>
                <mesh>
                    <meshStandardMaterial color={"white"} />
                    <boxBufferGeometry args={[15, 15, 15]} />
                </mesh>
            </group>
            <group position={[0, 0, -200]}>
                <FlyingPageObjects numObjects={30} worldSize={1000} lift={isMenuClicked}>
                    <meshStandardMaterial attach="material" color="gray" />
                    <boxBufferGeometry args={[15, 15, 15]} />
                </FlyingPageObjects>

                <Suspense fallback={null}>
                    <AboutPageRotatingMe meGltf={props.meGltf} />
                </Suspense>
            </group>

            <PageMenu onClick={() => setIsMenuClicked(true)} />
        </>
    );
}
