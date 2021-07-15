import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {
    Box3, CanvasTexture,
    Color,
    DoubleSide, Group, LinearFilter, Mesh, PointLight,
} from "three";
import {Vector3} from "three/src/math/Vector3";
import {HistoryContext} from "../../contexts/history-context";

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
    lightParams?: {inner?: Partial<LightParams>, outer?: Partial<LightParams>}
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
    const [textCanvasWidth, setTextCanvasWidth] = useState(0);
    const [textCanvasHeight, setTextCanvasHeight] = useState(0);
    const [textRefNode, setTextRefNode] = useState<Mesh>();
    const [colors, setColors] = useState(COLORS);
    const lightRef = useRef<PointLight>(null);
    const lowLightRef = useRef<PointLight>(null);
    const groupRef = useRef<Group>(null);
    const lightPositionY = props.height * 0.8;
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const history = useContext(HistoryContext).history;

    const lightParams = useMemo(() => {
        return {
            outer: {...DefaultLightParams.outer, ...props.lightParams?.outer},
            inner: {...DefaultLightParams.inner, ...props.lightParams?.inner}
        }
    }, [props.lightParams?.inner, props.lightParams?.outer]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.fonts.ready.then(function () {
            setIsFontLoaded(true);
        });
    }, []);

    const textRef = useCallback(node => {
        if (node === null) {
            return;
        }

        setTextRefNode(node);
    }, []);

    const lowLightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        lightPosition.add(new Vector3(0, LOW_LIGHT_OFFSET, 0));

        return lightPosition;
    }, [props.position]);

    const textScale: Vector3 = useMemo(() => {
        const labelBaseScale = 0.15;
        return new Vector3(
            textCanvasWidth * labelBaseScale,
            textCanvasHeight * labelBaseScale,
            0
        );
    }, [textCanvasHeight, textCanvasWidth])

    const textPosition = useMemo(() => {
        if (!textRefNode) {
            return;
        }

        const boundingBox: Box3 = new Box3().setFromObject(textRefNode);

        // At this point we don't know if the text is rotated (yet)
        // Simply assume that the longer side of our Box is the length.
        // (Only works of text has a rotation of n*90deg)
        const textLength = Math.max(
            boundingBox.max.x - boundingBox.min.x,
            boundingBox.max.y - boundingBox.min.y
        );

        const padding = 5;
        return new Vector3(0, -textLength / 2 + (props.height) - padding, 11);
    }, [props.height, textRefNode]);

    const texture = useMemo(() => {
        if (!isFontLoaded) {
            return;
        }

        const size = 100;

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        if (!ctx) {
            throw new Error(`Could not create ctx`);
        }

        const font = `${size}px AuvantGothicBold, monospace`;
        ctx.font = font;
        // measure how long the name will be
        const doubleBorderSize = borderSize * 2;
        const width = ctx.measureText(props.text).width + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'black';
        ctx.fillText(props.text, borderSize, borderSize);

        setTextCanvasWidth(ctx.canvas.width);
        setTextCanvasHeight(ctx.canvas.height);

        const texture = new CanvasTexture(ctx.canvas);

        // In combination with gl.setPixelRatio(window.devicePixelRatio) <- see canvas-content.tsx
        // this makes the text sharper.
        texture.minFilter = LinearFilter;

        return texture
    }, [props.text, isFontLoaded]);


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
                rotation={props.horizontal ? [0,0,Math.PI/2] : undefined}
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

                        {texture &&
                            <mesh
                                position={textPosition}
                                ref={textRef}
                                scale={textScale}
                                rotation={[0, 0, -Math.PI / 2]}
                            >
                                <meshBasicMaterial
                                    map={texture}
                                    side={DoubleSide}
                                    transparent={true}
                                />
                                <planeGeometry
                                    args={[1, 1]}
                                />
                            </mesh>
                        }
                    </group>

                </pointLight>
            </pointLight>
        </>
    );
}