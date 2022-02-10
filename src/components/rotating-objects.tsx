import React, { useLayoutEffect, useRef, } from "react";
import { BufferGeometry, InstancedMesh, Matrix4, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import useRandomGenerator from "../hooks/use-random";

export interface SkillPageCuboidsProps {
    numObjects: number;
    children: React.ReactNode;
    minDistance: number;
    maxDistance: number;
    height: number;
}

export default function RotatingObjects(props: SkillPageCuboidsProps) {
    const random = useRandomGenerator(3);
    const instancedMeshRef = useRef<InstancedMesh>(null);

    useLayoutEffect(() => {
        if (!instancedMeshRef.current) {
            return;
        }

        const transform = new Matrix4();
        for (let i = 0; i < props.numObjects; i++) {

            const distance = random() * (props.maxDistance - props.minDistance) + props.minDistance;
            const angle = random() * 2 * Math.PI;

            const x = distance * Math.cos(angle);
            const z = distance * Math.sin(angle);

            const y = random() * props.height;

            transform.setPosition(x, y, z);
            // instancedMeshRef.current.set(0.01,0.01,0.01)
            instancedMeshRef.current.setMatrixAt(i, transform);
        }
    }, [props.height, props.maxDistance, props.minDistance, props.numObjects, random]);


    useFrame(() => {
        if (!instancedMeshRef.current) {
            return;
        }

        instancedMeshRef.current.rotateY(0.003);
    });

    return (
        <instancedMesh
            args={[null as unknown as BufferGeometry, null as unknown as MeshStandardMaterial, props.numObjects]}
            ref={instancedMeshRef}
        >
            {props.children}
        </instancedMesh>
    );
}
