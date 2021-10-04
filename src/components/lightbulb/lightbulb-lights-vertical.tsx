import React, {useMemo} from "react";
import {LightParams} from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";

const LOW_LIGHT_OFFSET = 30;

export interface LightbulbLightsVerticalProps {
    lightPositionY: number;
    lightParams?: { inner?: Partial<LightParams>, outer?: Partial<LightParams> }
    color: string;
    position: Vector3;
    children: React.ReactNode;
}

export default function LightbulbLightsVertical(props: LightbulbLightsVerticalProps) {
    const lowLightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        lightPosition.add(new Vector3(0, LOW_LIGHT_OFFSET, 0));

        return lightPosition;
    }, [props.position]);

    const highLightPosition = useMemo(() => {
        return new Vector3(0, props.lightPositionY - LOW_LIGHT_OFFSET, 0);
    }, [props.lightPositionY]);

    return (
        <group
            position={lowLightPosition}
        >
            <pointLight
                color={props.color}
                intensity={props.lightParams?.outer?.intensity}
                distance={props.lightParams?.outer?.distance}
                decay={props.lightParams?.outer?.decay}
                castShadow={true}
            >
                <pointLight
                    color={props.color}
                    intensity={props.lightParams?.inner?.intensity}
                    distance={props.lightParams?.inner?.distance}
                    decay={props.lightParams?.inner?.decay}
                    position={highLightPosition}
                    castShadow={true}
                >
                    <group
                        position={[0, -props.lightPositionY - 10, 0]}
                    >
                        {props.children}
                    </group>
                </pointLight>
            </pointLight>
        </group>
    );
}