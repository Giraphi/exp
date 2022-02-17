/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: assetfactory (https://sketchfab.com/assetfactory)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/free-model-of-the-month-anatomical-eye-ball-281784b8e6ff4713991cdee224f07b09
title: Free model of the month - Anatomical Eye ball
*/

import * as THREE from "three";
import React from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type EyeGLTFResult = GLTF & {
    nodes: {
        Sphere_Glass_0: THREE.Mesh;
        Sphere001_Eye_0: THREE.Mesh;
    };
    materials: {
        Glass: THREE.MeshStandardMaterial;
        material: THREE.MeshStandardMaterial;
    };
};

export interface EyeModelProps {
    eyeGltfResult: EyeGLTFResult;
}

export default function EyeModel(props: EyeModelProps) {
    return (
        <group rotation={[-Math.PI / 2 - 0.1, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
                <group rotation={[Math.PI, 0, -Math.PI / 2]} scale={100}>
                    <mesh geometry={props.eyeGltfResult.nodes.Sphere_Glass_0.geometry} material={props.eyeGltfResult.materials.Glass} />
                </group>
                <group rotation={[Math.PI, 0, -Math.PI / 2]} scale={[98.16, 98.16, 98.16]}>
                    <mesh geometry={props.eyeGltfResult.nodes.Sphere001_Eye_0.geometry} material={props.eyeGltfResult.materials.material} />
                </group>
            </group>
        </group>
    );
}
