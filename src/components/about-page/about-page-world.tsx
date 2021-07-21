import React, {Suspense, useMemo, useState} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import useDevice from "../../hooks/use-device";
import {Vector3} from "three/src/math/Vector3";
import {colorAbout} from "../../style/constants";
import FlyingPageObjects from "../shared/flying-page-objects";
import Lightbulb from "../shared/lightbulb";
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
            <ambientLight color="white" intensity={0.01}/>
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
                numObjects={150}
                worldSize={1000}
                lift={isLightbulbClicked}
            >
                <boxBufferGeometry
                    args={[20,20,20]}
                />
            </FlyingPageObjects>

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