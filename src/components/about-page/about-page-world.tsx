import React, {Suspense, useState} from "react";
import {colorAbout} from "../../style/constants";
import FlyingPageObjects from "../shared/flying-page-objects";
import AboutPageHeadline from "./about-page-headline";
import ManModel from "../skills-page/man-model";
import PageMenu from "../shared/page-menu";

export default function AboutPageWorld() {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            {/*<ambientLight color="white" intensity={0.01}/>*/}
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
            </pointLight>

            <FlyingPageObjects
                numObjects={50}
                worldSize={1000}
                lift={isMenuClicked}
            >
                <boxBufferGeometry
                    args={[20,20,20]}
                />
            </FlyingPageObjects>

            <PageMenu
                onClick={() => setIsMenuClicked(true)}
            />

            <Suspense fallback={null}>
                <ManModel/>
            </Suspense>
        </>
    );
}