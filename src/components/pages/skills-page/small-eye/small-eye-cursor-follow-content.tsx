import React, { RefObject, useContext, useLayoutEffect, useRef } from "react";
import EyeModel, { EyeGLTFResult } from "../../../models/eye-model";
import { Group, PerspectiveCamera } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraPositionContext } from "../../../../contexts/camera-position-context";
import useWindowWidth from "../../../../hooks/use-window-width";

export interface CursorFollowModelContentProps {
    gltf: EyeGLTFResult;
    z: number;
    centerCoordinates?: { x: number; y: number };
    mousePositionRef?: RefObject<{ x: number; y: number } | undefined>;
}

export default function SmallEyeCursorFollowContent(props: CursorFollowModelContentProps) {
    const ref = useRef<Group>(null);
    const cameraRef = useRef<PerspectiveCamera>(null);
    const set = useThree((state) => state.set);
    const size = useThree((state) => state.size);
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const windowWidth = useWindowWidth();

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size]);

    useLayoutEffect(() => {
        if (!cameraRef.current) {
            return;
        }
        set({ camera: cameraRef.current });
    }, [set]);

    useFrame(() => {
        if (!ref.current || !ref || !props.mousePositionRef || !props.centerCoordinates) {
            return;
        }

        if (!props.mousePositionRef.current) {
            ref.current.lookAt(initialCameraPosition);
            return;
        }

        const relativeX = props.mousePositionRef.current.x - props.centerCoordinates.x;
        const relativeY = props.centerCoordinates.y - props.mousePositionRef.current.y;

        ref.current.lookAt(relativeX, relativeY, windowWidth / 8);
    });

    return (
        <>
            <perspectiveCamera position={[0, 0, 200]} ref={cameraRef} zoom={2} />

            <ambientLight color="white" intensity={0.15} />

            <pointLight color={"white"} intensity={2} distance={500} decay={1} position={[100, 150, -100]} />

            <group ref={ref} position={[0, 0, props.z]}>
                <EyeModel eyeGltfResult={props.gltf} />
            </group>
        </>
    );
}
