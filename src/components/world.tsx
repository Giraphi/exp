import React, {useLayoutEffect, useMemo, useRef} from "react";
import {BufferGeometry, InstancedMesh, Matrix4, MeshStandardMaterial} from "three";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import useRandomGenerator from "../hooks/use-random";

export interface WorldProps {
    numCuboids: number;
    size: number;
}

export default function World(props: WorldProps) {
    const random = useRandomGenerator(4);
    const instancedMeshRef = useRef<InstancedMesh>(null);

    const lightbulbPositions = useMemo(() => {
        return [
            new Vector3(0, 0, 100),
            new Vector3(115, 0, -105),
            new Vector3(-100, 0, 35)
        ]
    }, []);

    useLayoutEffect(() => {
        if (!instancedMeshRef.current) {
            return;
        }

        const transform = new Matrix4();
        for (let i = 0; i <= props.numCuboids; i++) {

            let height = random() * 160 + 100;

            const x = random() * props.size - props.size/2;
            const y = 0;
            const z = random() * props.size - props.size/2;

            if (Math.abs(x) <= 150 && z > -50) {
                height = height * 0.8;
            }

            transform.makeScale(1,height,1)
            transform.setPosition(x, y, z);
            instancedMeshRef.current.setMatrixAt(i, transform)
        }
    }, [props.numCuboids, props.size, random])

    return (
        <>
            {/*<fog attach="fog" args={['#53FAEB', 0.002, 1000]} />*/}
            {/*<directionalLight position={[100, 100, 100]} color="ddred" castShadow={true}/>*/}
            {/*<directionalLight position={[-1, -1, -1]} color="#ffdw738" castShadow={true} />*/}
            <ambientLight color="white" intensity={0.001}/>


            <instancedMesh
                args={[null as unknown as BufferGeometry, null as unknown as MeshStandardMaterial, props.numCuboids]}
                ref={instancedMeshRef}
                castShadow={true}
                receiveShadow={true}
            >

                <meshStandardMaterial
                    attach="material"
                    color="white"
                />
                <boxBufferGeometry
                    attach="geometry"
                    args={[20, 1, 20]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
            </instancedMesh>

            <Lightbulb
                position={lightbulbPositions[2]}
                text={"THIRD"}
                height={175}
            />
            <Lightbulb
                position={lightbulbPositions[0]}
                text={"FIRST"}
                height={160}
            />
            <Lightbulb
                position={lightbulbPositions[1]}
                text={"SECOND"}
                height={185}
            />

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <planeBufferGeometry
                    attach="geometry"
                    args={[props.size, props.size]}
                />
                <meshStandardMaterial
                    attach="material"
                    color="white"
                    flatShading={true}
                />
            </mesh>
        </>
    );
}