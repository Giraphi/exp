import React, {useContext, useEffect, useLayoutEffect, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Group, PerspectiveCamera} from "three";
import {CameraPositionContext} from "../../contexts/camera-position-context";
import MovementContext from "../../contexts/movement-context";
import useCursorCamera from "../../hooks/use-cursor-camera";

const moveSpeed = 500;
const lookSpeed = 1;

export interface ThreeSetupBirdCameraProps {
    cursorControl: boolean;
}

export default function ThreeSetupBirdCamera(props: ThreeSetupBirdCameraProps) {
    const birdRef = useRef<Group>(null);
    const cursorCameraRef = useRef<Group>(null);
    const set = useThree((state) => state.set);
    const size = useThree((state) => state.size);
    const cameraRef = useRef<PerspectiveCamera>(null);
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const movementContext = useContext(MovementContext);

    useCursorCamera(cursorCameraRef, props.cursorControl);

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
        set({camera: cameraRef.current});
    }, [set, size.height, size.width]);

    useEffect(() => {
        if (!movementContext.isReset) {
            return;
        }

        birdRef.current?.position.setX(initialCameraPosition.x);
        birdRef.current?.position.setY(initialCameraPosition.y);
        birdRef.current?.position.setZ(initialCameraPosition.z);
        birdRef.current?.rotation.set(0, 0, 0);
    }, [initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z, movementContext.isReset]);

    useFrame((state, delta) => {
        if (movementContext.isMovingForward) {
            birdRef.current?.translateZ(-delta * moveSpeed);
        }
        if (movementContext.isMovingBackward) {
            birdRef.current?.translateZ(delta * moveSpeed);
        }
        if (movementContext.isTurningLeft) {
            birdRef.current?.rotateY(lookSpeed * delta);
        }
        if (movementContext.isTurningRight) {
            birdRef.current?.rotateY(-lookSpeed * delta);
        }
    });

    return (
        <>
            <group ref={birdRef} position={initialCameraPosition}>
                <group ref={cursorCameraRef}>
                    <group rotation={[-0.3, 0, 0]}>
                        <perspectiveCamera ref={cameraRef}/>
                    </group>
                </group>
            </group>
        </>
    );
}
