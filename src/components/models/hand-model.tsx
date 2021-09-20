import React, {useRef} from "react";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import {useGLTF} from "@react-three/drei";
import {EyeGLTFResult} from "./eye-model";

export type HandGLTFResult = GLTF & {
    nodes: {
        defaultMaterial: THREE.Mesh
        defaultMaterial_1: THREE.Mesh
    }
    materials: {
        Hands_Low_defaultMat1: THREE.MeshStandardMaterial
    }
}

export interface HandModelProps {
    handGltfResult: HandGLTFResult;
}


export default function HandModel(props: HandModelProps) {
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={props.handGltfResult.nodes.defaultMaterial.geometry} material={props.handGltfResult.nodes.defaultMaterial.material} />
                    <mesh geometry={props.handGltfResult.nodes.defaultMaterial_1.geometry} material={props.handGltfResult.nodes.defaultMaterial_1.material} />
                </group>
            </group>
        </group>
    )
}