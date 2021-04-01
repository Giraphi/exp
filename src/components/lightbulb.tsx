import React, {useEffect, useMemo} from "react";
import {
    CanvasTexture,
    ClampToEdgeWrapping,
    Color,
    DoubleSide,
    LinearFilter,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry
} from "three";
import {Vector3} from "three/src/math/Vector3";
import {Object3D} from "three/src/core/Object3D";
import {useThree} from "react-three-fiber";

const MESH_HEIGHT = 400;
const LIGHT_POSITION_Y = 300

export interface IlluminatedMeshProps {
    position: Vector3;
}

export default function Lightbulb(props: IlluminatedMeshProps) {
    const {scene} = useThree();

    const lightPosition = useMemo(() => {
        const lightPosition = new Vector3();
        lightPosition.copy(props.position);
        console.log(lightPosition)
        lightPosition.add(new Vector3(0,LIGHT_POSITION_Y, 0));

        return lightPosition;
    }, [props.position]);

    const meshPosition = useMemo(() => {
        const meshPosition = new Vector3();
        props.position.copy(meshPosition);
        meshPosition.add(new Vector3(0,-LIGHT_POSITION_Y, 0));
        return meshPosition;
    }, [props.position]);
    

    useEffect(() => {
        function makeLabelCanvas(size: number, name: string) {
            const borderSize = 2;
            const ctx = document.createElement('canvas').getContext('2d');

            if (!ctx) {
                throw new Error(`Could not create ctx`);
            }

            const font =  `${size}px bold sans-serif`;
            ctx.font = font;
            // measure how long the name will be
            const doubleBorderSize = borderSize * 2;
            const width = ctx.measureText(name).width + doubleBorderSize;
            const height = size + doubleBorderSize;
            ctx.canvas.width = width;
            ctx.canvas.height = height;

            // need to set font again after resizing canvas
            ctx.font = font;
            ctx.textBaseline = 'top';

            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.fillText(name, borderSize, borderSize);

            return ctx.canvas;
        }

        function makePerson(x: number, size: number, name: string, color: string) {
            const canvas = makeLabelCanvas(size, name);
            const texture = new CanvasTexture(canvas);
            // because our canvas is likely not a power of 2
            // in both dimensions set the filtering appropriately.
            texture.minFilter = LinearFilter;
            texture.wrapS = ClampToEdgeWrapping;
            texture.wrapT = ClampToEdgeWrapping;

            const labelMaterial = new MeshBasicMaterial({
                map: texture,
                side: DoubleSide,
                transparent: true,
            });

            const root = new Object3D();
            root.position.x = x;

            const labelGeometry = new PlaneGeometry(1, 1);

            const label = new Mesh(labelGeometry, labelMaterial);
            root.add(label);
            label.position.y = 100;
            label.position.z = 100;

            // if units are meters then 0.01 here makes size
            // of the label into centimeters.
            const labelBaseScale = 0.01;
            label.scale.x = canvas.width  * labelBaseScale;
            label.scale.y = canvas.height * labelBaseScale;

            scene.add(root);
            return root;
        }

        makePerson(100, 200, "Text", "red");
    }, [scene])

    return (

        <pointLight
            color={"0xffffff"}
            intensity={1}
            distance={500}
            decay={2}
            position={lightPosition}
            castShadow={true}
        >
            <mesh
                position={meshPosition}
                scale={[20, MESH_HEIGHT, 20]}
            >
                <meshStandardMaterial
                    // args={[{emissive: "0xffffee", emissiveIntensity: 10, color: "0x000000"}]}
                    emissive={new Color("#ffffee")}
                    emissiveIntensity={1}
                    color={"#000000"}

                />
                <boxBufferGeometry
                    args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
                {/*<sphereGeometry args={[10, 16, 8]}/>*/}
            </mesh>
        </pointLight>

    );
}