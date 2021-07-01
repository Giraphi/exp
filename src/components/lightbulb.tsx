import React, {useCallback, useMemo, useRef, useState} from "react";
import {
    Box3, CanvasTexture,
    Color,
    DoubleSide, Group, LinearFilter, Mesh, PointLight,
} from "three";
import {Vector3} from "three/src/math/Vector3";

const COLORS = {
    mesh: "#ffffff",
    light: "#ffffff"
}
const COLORS_HOVER = {
    mesh: "#FF0500",
    light: "#FF0000",
}

export interface IlluminatedMeshProps {
    position: Vector3;
    text: string;
    textOffset: number;
    height: number;
}

export default function Lightbulb(props: IlluminatedMeshProps) {
    const [textCanvasWidth, setTextCanvasWidth] = useState(0);
    const [textCanvasHeight, setTextCanvasHeight] = useState(0);
    const [textRefNode, setTextRefNode] = useState<Mesh>();
    const [colors, setColors] = useState(COLORS);
    const lightRef = useRef<PointLight>(null);
    const groupRef = useRef<Group>(null);
    const lightPositionY = props.height - 50;

    const textRef = useCallback(node => {
        if (node === null) {
            return;
        }

        setTextRefNode(node);
    }, []);

    const lightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        lightPosition.add(new Vector3(0, lightPositionY, 0));

        return lightPosition;
    }, [lightPositionY, props.position]);

    // const meshPosition = useMemo(() => {
    //     return new Vector3(0, -lightPositionY, 0);
    // }, []);


    const textScale: Vector3 = useMemo(() => {
        const labelBaseScale = 0.15;
        return new Vector3(
            textCanvasWidth  * labelBaseScale,
            textCanvasHeight * labelBaseScale,
            0
        );
    }, [textCanvasHeight, textCanvasWidth])

    const textPosition = useMemo(() => {
        if (!textRefNode) {
            return;
        }

        const boundingBox: Box3 = new Box3().setFromObject(textRefNode);
        const textLength = boundingBox.max.y - boundingBox.min.y;

        console.log(- textLength/2 + props.textOffset)

        return new Vector3(0, props.height, 11);
    }, [props.height, props.textOffset, textRefNode]);

    const texture = useMemo(() => {
        const size = 100;
        // const text = "Text";

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        if (!ctx) {
            throw new Error(`Could not create ctx`);
        }

        const font = `${size}px AuvantGothicBold`;
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
    }, [props.text]);


    function onPointerOver() {
        setColors(COLORS_HOVER);
        document.body.style.cursor = "pointer";
    }

    function onPointerOut() {
        setColors(COLORS);
        document.body.style.cursor = "";
    }

    function onClick() {
        setColors(COLORS_HOVER);
    }

    // useSpring({
    //     from: {
    //         y: 50
    //     },
    //     y: -50,
    //
    //     onFrame: (state => {
    //         if (!lightRef || !lightRef.current) {
    //             return;
    //         }
    //         lightRef.current.position.y = state.y;
    //     })
    // })


    // useFrame((state,delta) => {
    //     if (!lightRef.current || !groupRef.current) {
    //         return;
    //     }
    //     lightRef.current.position.y += Math.sin(state.clock.getElapsedTime())
    //     // groupRef.current.position.y -= Math.sin(state.clock.getElapsedTime())
    // })

    return (
        <>
            <pointLight
                ref={lightRef}
                color={colors.light}
                intensity={0.5}
                distance={400}
                decay={2}
                position={lightPosition}
                castShadow={true}
            >
                <group
                    ref={groupRef}
                    position={[0, -lightPositionY, 0]}
                >
                    <mesh
                        scale={[20, props.height, 20]}
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

                    <mesh
                        position={[0,props.textOffset,11]}
                        ref={textRef}
                        scale={textScale}
                        rotation={[0,0, -Math.PI/2]}
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
                </group>

            </pointLight>

        </>
    );
}