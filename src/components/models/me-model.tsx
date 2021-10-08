import React from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export type MeGLTFResult = GLTF & {
    nodes: {
        mesh_0: THREE.Mesh;
    };
};

export interface MeModelProps {
    meGltfResult: MeGLTFResult;
    scale?: [number, number, number];
    rotation?: [number, number, number];
    position?: [number, number, number];
}

export default function MeModel(props: MeModelProps) {
    return (
        <group scale={props.scale} rotation={props.rotation} position={props.position} dispose={null}>
            <mesh
                geometry={props.meGltfResult.nodes.mesh_0.geometry}
                material={props.meGltfResult.nodes.mesh_0.material}
                receiveShadow={true}
            />
        </group>
    );
}
