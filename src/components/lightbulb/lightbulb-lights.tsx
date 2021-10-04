import React, {useMemo} from "react";
import {LightParams} from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import LightbulbLightsVertical from "./lightbulb-lights-vertical";
import LightbulbLightsHorizontal from "./lightbulb-lights-horizontal";

export interface LightbulbLightsProps {
    horizontal: boolean;

    lightPositionY:number;
    lightParams?: { inner?: Partial<LightParams>, outer?: Partial<LightParams> }
    color: string;
    position: Vector3;

    children: React.ReactNode;
}

const DefaultLightParams = {
    outer: {
        intensity: 20,
        distance: 60,
        decay: 4,
    },
    inner: {
        intensity: 1.2,
        distance: 350,
        decay: 3,
    }
}

export default function LightbulbLights(props: LightbulbLightsProps) {

    const lightParams = useMemo(() => {
        return {
            outer: {...DefaultLightParams.outer, ...props.lightParams?.outer},
            inner: {...DefaultLightParams.inner, ...props.lightParams?.inner}
        }
    }, [props.lightParams?.inner, props.lightParams?.outer]);

    return (
        <>
            {!props.horizontal &&
                <LightbulbLightsVertical
                    lightPositionY={props.lightPositionY}
                    lightParams={lightParams}
                    color={props.color}
                    position={props.position}
                >
                    {props.children}
                </LightbulbLightsVertical>
            }

            {props.horizontal &&
                <LightbulbLightsHorizontal
                    lightParams={lightParams}
                    color={props.color}
                    position={props.position}
                >
                    {props.children}
                </LightbulbLightsHorizontal>
            }
        </>
    );
}