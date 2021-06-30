import React, {useCallback, useMemo, useState} from "react";
import {
    Box3, CanvasTexture,
    Color,
    DoubleSide, LinearFilter, Mesh,
} from "three";
import {Vector3} from "three/src/math/Vector3";
import {useThree} from "react-three-fiber";
import LightbulbEdges from "./lightbulb-edges";

// const props.height = 400;
const LIGHT_POSITION_Y = 150;

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

    const textRef = useCallback(node => {
        if (node === null) {
            return;
        }

        setTextRefNode(node);
    }, []);

    const lightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        lightPosition.add(new Vector3(0, LIGHT_POSITION_Y, 0));

        return lightPosition;
    }, [props.position]);
    const meshPosition = useMemo(() => {
        return new Vector3(0, -LIGHT_POSITION_Y, 0);
    }, []);

    const textPosition = useMemo(() => {
        if (!textRefNode) {
            return;
        }

        const boundingBox: Box3 = new Box3().setFromObject(textRefNode);
        const textLength = boundingBox.max.y - boundingBox.min.y;

        return new Vector3(0, - textLength/2 + props.textOffset, 11);
    }, [props.textOffset, textRefNode]);

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

    const textScale: Vector3 = useMemo(() => {
        const labelBaseScale = 0.15;
        return new Vector3(
            textCanvasWidth  * labelBaseScale,
            textCanvasHeight * labelBaseScale,
            0
        );
    }, [textCanvasHeight, textCanvasWidth])

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

    return (
        <>
            <pointLight
                color={colors.light}
                intensity={0.5}
                distance={400}
                decay={2}
                position={lightPosition}
                castShadow={true}
            >
                <mesh
                    position={meshPosition}
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


                    {/*<LightbulbEdges/>*/}

                    {/*<canvasTexture/>*/}
                </mesh>

                <mesh
                    ref={textRef}
                    position={textPosition}
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
            </pointLight>

        </>
    );
}