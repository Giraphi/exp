import React, {useCallback, useRef, useState} from "react";
import {useFrame, useThree, Vector3} from "react-three-fiber";
import Controls from "./controls";
import {Group, PerspectiveCamera} from "three";

export interface CameraProps {
    position: Vector3;
}

export default function BirdCamera(props: CameraProps) {
    const birdRef= useRef<Group>(null);
    const { setDefaultCamera } = useThree();
    const [cameraNode, setCameraNode] = useState<PerspectiveCamera>();

    const cameraRef = useCallback((node) => {
        if (node === null) {
            return;
        }

        setDefaultCamera(node);
        setCameraNode(node);
    }, [setDefaultCamera]);

    useFrame(() => {
        if (!cameraNode) {
            return;
        }

        cameraNode.updateMatrixWorld();
    });

    return (
        <>
            <group ref={birdRef} position={props.position}>
                <group rotation={[-0.3,0, 0]}>
                    <perspectiveCamera ref={cameraRef}  />
                </group>

                <pointLight
                    color={"0xffffff"}
                    intensity={0.2}
                    distance={300}
                    decay={2}
                    castShadow={false}
                    position={[0,0,0]}
                />
            </group>


            <Controls object={birdRef}/>
        </>
    )

}