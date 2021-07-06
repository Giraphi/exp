import React, {useEffect, useLayoutEffect, useRef} from "react";
import {BufferGeometry, InstancedMesh, Matrix4, MeshStandardMaterial} from "three";
import useRandomGenerator from "../hooks/use-random";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three/src/math/Vector3";

export interface CuboidsProps {
    numCuboids: number;
    worldSize: number;
    lift: boolean;
}

export default function Cuboids(props: CuboidsProps) {
    const random = useRandomGenerator(4);
    const instancedMeshRef = useRef<InstancedMesh>(null);
    const gluedIndexes = useRef([...Array(props.numCuboids - 1)].map((item, index) => index));

    useEffect(() => {
        if (!props.lift) {
            return;
        }

        setInterval(() => {
            gluedIndexes.current.shift();
        }, 20)

    }, [props.lift])

    useLayoutEffect(() => {
        if (!instancedMeshRef.current) {
            return;
        }

        const transform = new Matrix4();
        for (let i = 0; i < props.numCuboids; i++) {

            let height = random() * 160 + 100;

            const x = random() * props.worldSize - props.worldSize / 2;
            const y = 0;
            const z = random() * props.worldSize - props.worldSize / 2;

            if (Math.abs(x) <= 150 && z > -50) {
                height = height * 0.8;
            }

            transform.makeScale(1, height, 1)
            transform.setPosition(x, y, z);
            instancedMeshRef.current.setMatrixAt(i, transform)
        }
    }, [props.numCuboids, props.worldSize, random]);

    useFrame(({ clock }) => {
        if (!props.lift || !instancedMeshRef.current) {
            return;
        }

        const speed = 1;
        const delta = clock.elapsedTime * speed;
        const currentGluedIndexes = [...gluedIndexes.current];

        for (let i = 0; i <= props.numCuboids; i++) {
            if (currentGluedIndexes.indexOf(i) !== -1) {
                continue;
            }

            const matrix = new Matrix4();
            instancedMeshRef.current.getMatrixAt(i, matrix);
            const position = new Vector3().setFromMatrixPosition(matrix);
            position.add(new Vector3(0,delta,0));
            matrix.setPosition(position);
            instancedMeshRef.current.setMatrixAt(i, matrix);
        }
        instancedMeshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
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
    );
}