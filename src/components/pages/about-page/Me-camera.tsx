/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { useViewportScroll } from "framer-motion";
import { AnimationAction } from "three";
import useCursorCamera from "../../../hooks/use-cursor-camera";

type GLTFResult = GLTF & {
    nodes: {
        Mesh_0: THREE.Mesh;
    };
    materials: {
        Material_0: THREE.MeshStandardMaterial;
    };
};

export interface MeCameraProps {
    isMenuClicked: boolean;
}

export default function Model(props: MeCameraProps) {
    const groupRef = useRef<THREE.Group>(null);
    const bounceMeshRef = useRef<THREE.Group>(null);
    const rotateMeshRef = useRef<THREE.Group>(null);
    const cameraRef = useRef<THREE.Camera>(null);
    const cursorCameraRef = useRef<THREE.Camera>(null);

    const { nodes, materials, animations } = useGLTF("models/me-camera.glb") as GLTFResult;
    const { actions } = useAnimations(animations, groupRef);
    const { scrollYProgress } = useViewportScroll();

    useCursorCamera(cursorCameraRef, true, true);

    useEffect(() => {
        (actions["CameraAction.006"] as AnimationAction).play().paused = true;
    }, [actions]);

    // Camera Scroll Movement
    useFrame(() => {
        const scroll = scrollYProgress.get();
        const action = actions["CameraAction.006"] as AnimationAction;

        action.time = THREE.MathUtils.lerp(action.time, action.getClip().duration * scroll, 0.05);
    });

    // Mesh Bouncing
    useFrame((state) => {
        if (!bounceMeshRef.current) {
            return;
        }
        const et = state.clock.elapsedTime;
        bounceMeshRef.current.position.y = Math.sin((et + 2000) / 2) / 10;
        bounceMeshRef.current.rotation.x = Math.sin((et + 2000) / 3) / 15;
        bounceMeshRef.current.rotation.y = Math.cos((et + 2000) / 2) / 15;
        bounceMeshRef.current.rotation.z = Math.sin((et + 2000) / 3) / 15;
    });

    // // Camera Cursor Movement
    // useFrame(() => {
    //     if (device === "small" || !mousePositionRef || !mousePositionRef.current || !cursorCameraRef.current) {
    //         return;
    //     }
    //
    //     cursorCameraRef.current.rotation.x = -0.00005 * (mousePositionRef.current.clientY - canvasSize.height / 2)
    //     cursorCameraRef.current.rotation.z = 0.00005 * (mousePositionRef.current.clientX - canvasSize.width / 2)
    // })

    useFrame(() => {
        if (!props.isMenuClicked || !rotateMeshRef.current) {
            return;
        }

        if (rotateMeshRef.current.position.y == 0) {
            rotateMeshRef.current.position.y = 0.1;
        }

        rotateMeshRef.current.rotation.y = (rotateMeshRef.current.rotation.y + 0.02) * 1.07;
        rotateMeshRef.current.position.y *= 1.07;
    });

    return (
        <group ref={groupRef}>
            <group name="Camera" position={[-0.06, 1.36, 7.82]} rotation={[1.38, 0, 0]} ref={cameraRef}>
                <group ref={cursorCameraRef}>
                    <PerspectiveCamera makeDefault far={100} near={0.1} fov={38.27} rotation={[-Math.PI / 2, 0, 0]} />
                </group>
            </group>

            <group ref={rotateMeshRef}>
                <group ref={bounceMeshRef}>
                    <mesh
                        castShadow={true}
                        geometry={nodes.Mesh_0.geometry}
                        material={materials.Material_0}
                        rotation={[-0.1, 0.08, 0.07]}
                        scale={8.62}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("models/me-camera.glb");
