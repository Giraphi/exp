import React, {useContext, useLayoutEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";
import ThreeSetupControls from "./three-setup-controls";
import {Group, PerspectiveCamera} from "three";
import {CameraPositionContext} from "../../contexts/camera-position-context";

export default function ThreeSetupBirdCamera() {
    const birdRef= useRef<Group>(null);
    const set = useThree(state => state.set);
    const size = useThree(state => state.size);
    const cameraRef = useRef<PerspectiveCamera>(null);
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height
            cameraRef.current.updateProjectionMatrix()
        }
    }, [size]);

    useLayoutEffect(() => {
        if (!cameraRef.current) {
            return;
        }
        set({ camera: cameraRef.current });
    }, [set, size.height, size.width])

    return (
        <>
            <group ref={birdRef} position={initialCameraPosition}>
                <group rotation={[-0.3,0, 0]}>
                    <perspectiveCamera ref={cameraRef}/>
                </group>
            </group>


            <ThreeSetupControls object={birdRef}/>
        </>
    )

}