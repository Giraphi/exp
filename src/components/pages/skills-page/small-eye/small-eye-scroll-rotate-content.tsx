import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import EyeModel, { EyeGLTFResult } from "../../../models/eye-model";
import { PerspectiveCamera } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";

export interface ScrollRotateModelContentProps {
    z: number;
    gltf: EyeGLTFResult;
    scrollYProgress: MotionValue<number>;
}

export default function SmallEyeScrollRotateContent(props: ScrollRotateModelContentProps) {
    const cameraRef = useRef<PerspectiveCamera>(null);
    const set = useThree((state) => state.set);
    const size = useThree((state) => state.size);
    const [rotation, setRotation] = useState(0);

    const random = useMemo(() => {
        function getRandom(min: number, max: number) {
            return Math.round(Math.random() * (max - min) + min);
        }
        return getRandom(5, 10);
    }, []);

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
        setRotation(props.scrollYProgress.get() * random * Math.PI);
    });

    return (
        <>
            <ambientLight color="white" intensity={0.2} />
            <perspectiveCamera position={[0, 0, 200]} ref={cameraRef} zoom={2} />

            <pointLight color={"white"} intensity={2} distance={500} decay={1} position={[100, 150, -100]} />

            <group position={[0, 0, props.z]} rotation={[0, rotation, 0]}>
                <EyeModel eyeGltfResult={props.gltf} />
            </group>
        </>
    );
}
