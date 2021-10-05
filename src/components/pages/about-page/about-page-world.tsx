import React, {Suspense, useState} from "react";
import {colorAbout} from "../../../style/constants";
import FlyingPageObjects from "../../flying-page-objects";
import AboutPageHeadline from "./about-page-headline";
import PageMenu from "../../page-menu";
import {MeGLTFResult} from "../../models/me-model";
import AboutPageRotatingMe from "./about-page-rotating-me";

export interface AboutPageWorldProps {
    meGltf: MeGLTFResult;
}

export default function AboutPageWorld(props: AboutPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            <hemisphereLight intensity={0.05}/>

            <AboutPageHeadline/>

            <pointLight
                color={colorAbout}
                intensity={2}
                distance={1000}
                decay={1}
                position={[420, 1000, 40]}
                castShadow={true}
            >
            </pointLight>

            <FlyingPageObjects
                numObjects={30}
                worldSize={1000}
                lift={isMenuClicked}
            >
                <meshStandardMaterial
                    attach="material"
                    color="gray"
                />
                <boxBufferGeometry
                    args={[20, 20, 20]}
                />
            </FlyingPageObjects>

            <PageMenu
                onClick={() => setIsMenuClicked(true)}
            />

            <Suspense fallback={null}>
                <AboutPageRotatingMe meGltf={props.meGltf}/>
            </Suspense>
        </>
    );
}