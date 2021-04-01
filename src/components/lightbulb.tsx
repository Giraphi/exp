import React, {useCallback, useMemo, useState} from "react";
import {
    Box3,
    BoxBufferGeometry,
    CanvasTexture,
    Color,
    DoubleSide, Mesh,
} from "three";
import {Vector3} from "three/src/math/Vector3";

const MESH_HEIGHT = 400;
const LIGHT_POSITION_Y = 150;
const Text_POSITION_Y = 150;

export interface IlluminatedMeshProps {
    position: Vector3;
    text: string;
}

export default function Lightbulb(props: IlluminatedMeshProps) {
    const [textCanvasWidth, setTextCanvasWidth] = useState(0);
    const [textCanvasHeight, setTextCanvasHeight] = useState(0);
    const [textRefNode, setTextRefNode] = useState<Mesh>();

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

        return new Vector3(0, - textLength/2 + 40, 11);
    }, [textRefNode]);

    const texture = useMemo(() => {
        const size = 100;
        // const text = "Text";

        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        if (!ctx) {
            throw new Error(`Could not create ctx`);
        }

        const font = `${size}px monospace`;
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

        return new CanvasTexture(ctx.canvas);
    }, [props.text]);

    const textScale: Vector3 = useMemo(() => {
        const labelBaseScale = 0.1;
        return new Vector3(
            textCanvasWidth  * labelBaseScale,
            textCanvasHeight * labelBaseScale,
            0
        );
    }, [textCanvasHeight, textCanvasWidth])

    return (
        <>
            <pointLight
                color={"0xffffff"}
                intensity={0.5}
                distance={400}
                decay={2}
                position={lightPosition}
                castShadow={true}
            >
                <mesh
                    position={meshPosition}
                    scale={[20, MESH_HEIGHT, 20]}
                >
                    <meshStandardMaterial
                        emissive={new Color("#ffffee")}
                        emissiveIntensity={1}
                        color={"#000000"}
                    />
                    <boxBufferGeometry
                        args={[1, 1, 1]}/>
                    <canvasTexture/>
                    {/*<sphereGeometry args={[10, 16, 8]}/>*/}
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