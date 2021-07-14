import React, {useLayoutEffect, useRef} from "react";
import {useThree, Vector3} from "@react-three/fiber";
import ThreeBaselineControls from "./three-baseline-controls";
import {Group, PerspectiveCamera} from "three";

export interface CameraProps {
    position: Vector3;
}

export default function ThreeBaselineBirdCamera(props: CameraProps) {
    const birdRef= useRef<Group>(null);
    const set = useThree(state => state.set);
    const size = useThree(state => state.size);
    const cameraRef = useRef<PerspectiveCamera>(null);

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
            <group ref={birdRef} position={props.position}>
                <group rotation={[-0.3,0, 0]}>
                    <perspectiveCamera ref={cameraRef}  />
                </group>

                <pointLight
                    color={"white"}
                    intensity={1}
                    distance={300}
                    decay={2}
                    castShadow={false}
                    position={[0,0,0]}
                />
            </group>


            <ThreeBaselineControls object={birdRef}/>
        </>
    )

}