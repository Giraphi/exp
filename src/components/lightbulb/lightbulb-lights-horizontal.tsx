import React from "react";
import {Vector3} from "three/src/math/Vector3";
import {LightParams} from "./lightbulb";

export interface LightbulbLightsHorizontalProps {
    lightParams?: { inner?: Partial<LightParams>, outer?: Partial<LightParams> }
    color: string;
    position: Vector3;
    children: React.ReactNode;
}

export default function LightbulbLightsHorizontal(props: LightbulbLightsHorizontalProps) {
    return (
        <group
            position={props.position}
            rotation={[0, 0, Math.PI / 2]}
        >
            <pointLight
                color={props.color}
                intensity={props.lightParams?.inner?.intensity}
                distance={props.lightParams?.inner?.distance}
                decay={props.lightParams?.inner?.decay}
            >
                {props.children}
            </pointLight>
        </group>
    );
}