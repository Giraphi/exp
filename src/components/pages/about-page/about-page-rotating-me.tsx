import React, {useRef} from "react";
import MeModel, {MeGLTFResult} from "../../models/me-model";
import {useFrame} from "@react-three/fiber";
import {Group} from "three";

export interface AboutPageRotatingMeProps {
    meGltf: MeGLTFResult;
}

export default function AboutPageRotatingMe(props: AboutPageRotatingMeProps) {
    const modelRef = useRef<Group>(null);

    const rotationAngle = useRef(0);
    const rotationSpeed = -0.5;

    useFrame((state, delta)  => {
        if (!modelRef || !modelRef.current) {
            return;
        }

        rotationAngle.current = delta * rotationSpeed;
        modelRef.current.rotateY(rotationAngle.current);
    });

    return (
        <group ref={modelRef}>
            <MeModel
                meGltfResult={props.meGltf}
                scale={[1300,1300,1300]}
                rotation={[-0.22, -6.25, 0.09]}
                position={[0,-25,0]}
            />
        </group>
    );
}