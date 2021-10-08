import React, { useContext, useEffect, useState } from "react";
import { Color } from "three";
import { Vector3 } from "three/src/math/Vector3";
import { HistoryContext } from "../../contexts/history-context";
import { Text } from "@react-three/drei";
import auvantGothic from "../../fonts/OPTIAuvantGothic-Bold.woff";
import LightbulbLights from "./lightbulb-lights";

const COLORS = {
    mesh: "#ffffff",
    light: "#ffffff",
};

const COLORS_NEGATIVE = {
    mesh: "#000000",
    light: "#ffffff",
};

const COLORS_HOVER = {
    mesh: "#FF0500",
    light: "#FF0000",
};

export interface LightParams {
    intensity: number;
    distance: number;
    decay: number;
}

export interface LightbulbProps {
    position: Vector3;
    text: string;
    height: number;
    onClick: () => void;
    path: string;
    isActive?: boolean;
    horizontal?: boolean;
    lightParams?: {
        inner?: Partial<LightParams>;
        outer?: Partial<LightParams>;
    };
    negative?: boolean;
}

export default function Lightbulb(props: LightbulbProps) {
    const [colors, setColors] = useState(props.negative ? COLORS_NEGATIVE : COLORS);
    const lightPositionY = props.height * 0.8;
    const [isClicked, setIsClicked] = useState(false);
    const history = useContext(HistoryContext).history;

    useEffect(() => {
        return () => {
            document.body.style.cursor = "";
        };
    }, []);

    useEffect(() => {
        if (props.isActive) {
            setColors(COLORS_HOVER);
            return;
        }
        props.negative ? setColors(COLORS_NEGATIVE) : setColors(COLORS);
    }, [props.isActive, props.negative]);

    function onPointerOver() {
        if (props.isActive) {
            return;
        }
        setColors(COLORS_HOVER);
        document.body.style.cursor = "pointer";
    }

    function onPointerOut() {
        document.body.style.cursor = "";
        if (props.isActive) {
            return;
        }

        if (isClicked) {
            return;
        }
        setColors(props.negative ? COLORS_NEGATIVE : COLORS);
    }

    function onClick() {
        if (props.isActive) {
            return;
        }

        setColors(COLORS_HOVER);
        setIsClicked((isClicked) => !isClicked);
        props.onClick();
        setTimeout(() => {
            history.push(props.path);
        }, 1000);
    }

    return (
        <LightbulbLights
            lightPositionY={lightPositionY}
            lightParams={props.lightParams}
            color={colors.light}
            position={props.position}
            horizontal={!!props.horizontal}
        >
            <mesh
                scale={[20, props.height, 20]}
                position={[0, props.height / 2, 0]}
                onPointerOver={onPointerOver}
                onClick={onClick}
                onPointerOut={onPointerOut}
            >
                <meshStandardMaterial emissive={new Color(colors.mesh)} emissiveIntensity={1} color={"#000000"} />

                <boxBufferGeometry args={[1, 1, 1]} />
            </mesh>

            <Text
                fontSize={15}
                lineHeight={1}
                font={auvantGothic}
                color={props.negative ? "white" : "black"}
                position={[0, props.height - 5, 12]}
                rotation={[0, 0, -Math.PI / 2]}
                anchorX={"left"}
                anchorY={"middle"}
            >
                {props.text}
            </Text>
        </LightbulbLights>
    );
}
