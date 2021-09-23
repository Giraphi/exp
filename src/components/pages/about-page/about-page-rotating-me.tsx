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
    const rotationSpeed = -0.3;

    useFrame((state, delta)  => {
        if (!modelRef || !modelRef.current) {
            return;
        }

        rotationAngle.current = delta * rotationSpeed;
        modelRef.current.rotateY(rotationAngle.current);
    });

    return (
        <group
            ref={modelRef}
            position={[0,-80,-200]}
            rotation={[0,1.4,0]}
        >
            <MeModel
                meGltfResult={props.meGltf}
                scale={[1500,1500,1500]}
                rotation={[-0.22, -6.25, 0.09]}
            />
        </group>
    );
}