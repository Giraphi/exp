import React, {Suspense, useMemo, useState} from "react";
import MeCamera from "./Me-camera";
import {Plane} from "@react-three/drei";
import PageMenu from "../../page-menu";
import {Vector3} from "three/src/math/Vector3";
import useDevice from "../../../hooks/use-device";

export default function AboutPageCanvas() {
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const device = useDevice();

    const menuPosition = useMemo(() => {
        return device !== "small" ? new Vector3(0, 0, 0) : new Vector3(0, 0, 0)
    }, [device])

    return (
        <>
            <Suspense fallback={null}>
                <MeCamera/>
            </Suspense>

            <gridHelper args={[1000, 400, "deeppink", "deeppink"]} position={[0, -5, 0]}/>

            <Plane
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -5.1, 0]}
                args={[1000, 1000]}
            >
                <meshStandardMaterial color={"#0A0813"}/>
            </Plane>

            <pointLight intensity={0.2} color={"white"}
                        position={[-1.85, 1.6, 1]}
                        castShadow={true}
            />
            <pointLight
                distance={1000}
                decay={0.1}
                castShadow={true}
                intensity={0.6}
                color={"white"}
                position={[3, 2, 3]}
            />
            <pointLight castShadow={true} intensity={0.1} color={"white"} position={[-1, 0, -1]}/>

            <group
                scale={0.01}
                position={device === "small" ? [-0.5, 1.8, 1] : [-1.85, 1.6, 0]}
            >
                <PageMenu
                    disableWhiteLight={true}
                    position={menuPosition}
                    onClick={() => setIsMenuClicked(true)}
                    hoverColor={"#800080"}
                    negative={true}
                />
            </group>
        </>
    );
}
