import React, {useEffect, useRef, useState} from "react";
import {RectAreaLightUniformsLib} from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import {useThree} from "react-three-fiber";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";
import {Color, Light, RectAreaLight} from "three";
import {Vector3} from "three/src/math/Vector3";


export interface IlluminatedMeshProps {
    position?: Vector3;
}

export default function Lightbulb(props: IlluminatedMeshProps) {
    return (
        <pointLight
            color={"0xffffff"}
            intensity={1}
            distance={500}
            decay={2}
            position={props.position}
            castShadow={true}
        >
            <mesh>
                <meshStandardMaterial
                    // args={[{emissive: "0xffffee", emissiveIntensity: 10, color: "0x000000"}]}
                    emissive={new Color("#ffffee")}
                    emissiveIntensity={1}
                    color={"#000000"}

                />
                <sphereGeometry args={[10, 16, 8]}/>
            </mesh>
        </pointLight>
    );
}