import React, {useContext, useMemo, useRef, useState} from "react";
import {
    Color,
    Group, PointLight,
} from "three";
import {Vector3} from "three/src/math/Vector3";
import {HistoryContext} from "../../contexts/history-context";
import {Text} from "@react-three/drei";
import auvantGothic from "../../fonts/OPTIAuvantGothic-Bold.woff";

const LOW_LIGHT_OFFSET = 30;

const COLORS = {
    mesh: "#ffffff",
    light: "#ffffff"
}
const COLORS_HOVER = {
    mesh: "#FF0500",
    light: "#FF0000",
}

export interface LightParams {
    intensity: number;
    distance: number;
    decay: number;
}

export interface Lightbulb {
    position: Vector3;
    text: string;
    height: number;
    onClick: () => void;
    path: string;
    horizontal?: boolean;
    lightParams?: { inner?: Partial<LightParams>, outer?: Partial<LightParams> }
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

export default function Lightbulb(props: Lightbulb) {
    const [colors, setColors] = useState(COLORS);
    const lightRef = useRef<PointLight>(null);
    const lowLightRef = useRef<PointLight>(null);
    const groupRef = useRef<Group>(null);
    const lightPositionY = props.height * 0.8;
    const [isClicked, setIsClicked] = useState(false);
    const history = useContext(HistoryContext).history;

    const lightParams = useMemo(() => {
        return {
            outer: {...DefaultLightParams.outer, ...props.lightParams?.outer},
            inner: {...DefaultLightParams.inner, ...props.lightParams?.inner}
        }
    }, [props.lightParams?.inner, props.lightParams?.outer]);

    const lowLightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        lightPosition.add(new Vector3(0, LOW_LIGHT_OFFSET, 0));

        return lightPosition;
    }, [props.position]);

    function onPointerOver() {
        setColors(COLORS_HOVER);
        document.body.style.cursor = "pointer";
    }

    function onPointerOut() {
        document.body.style.cursor = "";
        if (isClicked) {
            return;
        }
        setColors(COLORS);
    }

    function onClick() {
        setColors(COLORS_HOVER);
        setIsClicked(isClicked => !isClicked);
        props.onClick();
        setTimeout(() => {
            history.push(props.path);
        }, 1000);
    }

    return (
        <>
            <pointLight
                ref={lowLightRef}
                color={colors.light}
                intensity={lightParams.outer.intensity}
                distance={lightParams.outer.distance}
                decay={lightParams.outer.decay}
                position={lowLightPosition}
                castShadow={true}
                rotation={props.horizontal ? [0, 0, Math.PI / 2] : undefined}
            >
                <pointLight
                    ref={lightRef}
                    color={colors.light}
                    intensity={lightParams.inner.intensity}
                    distance={lightParams.inner.distance}
                    decay={lightParams.inner.decay}
                    position={[0, lightPositionY - LOW_LIGHT_OFFSET, 0]}
                    castShadow={true}
                >
                    <group
                        ref={groupRef}
                        position={[0, -lightPositionY - 10, 0]}
                    >
                        <mesh
                            scale={[20, props.height, 20]}
                            position={[0, props.height / 2, 0]}
                            onPointerOver={onPointerOver}
                            onClick={onClick}
                            onPointerOut={onPointerOut}
                        >
                            <meshStandardMaterial
                                emissive={new Color(colors.mesh)}
                                emissiveIntensity={1}
                                color={"#000000"}
                            />

                            <boxBufferGeometry
                                args={[1, 1, 1]}/>
                        </mesh>

                        <Text
                            fontSize={15}
                            lineHeight={1}
                            font={auvantGothic}
                            color={"black"}
                            position={[0,props.height - 5,12]}
                            rotation={[0, 0, -Math.PI / 2]}
                            anchorX={"left"}
                            anchorY={"middle"}
                        >
                            {props.text}
                        </Text>
                    </group>

                </pointLight>
            </pointLight>
        </>
    );
}