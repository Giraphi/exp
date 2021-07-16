import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import useRandomGenerator from "../../hooks/use-random";
import {BufferGeometry, InstancedMesh, Matrix4, MeshStandardMaterial} from "three";
import {useFrame} from "@react-three/fiber";
import {Vector3} from "three/src/math/Vector3";

export interface SkillPageCuboidsProps {
    numCuboids: number;
    worldSize: number;
    lift: boolean;
}

const LIFT_SPEED = 400;
const DELAY_MS = 20;

export default function SkillsPageCuboids(props: SkillPageCuboidsProps) {
    const random = useRandomGenerator(3);
    const instancedMeshRef = useRef<InstancedMesh>(null);
    const gluedIndexes = useRef([...Array(props.numCuboids - 1)].map((item, index) => index));
    const [isListFinished, setIsListFinished] = useState(false);

    useEffect(() => {
        if (!props.lift) {
            return;
        }

        setInterval(() => {
            gluedIndexes.current.shift();
        }, DELAY_MS)

    }, [props.lift])

    useLayoutEffect(() => {
        if (!instancedMeshRef.current) {
            return;
        }

        const transform = new Matrix4();
        for (let i = 0; i < props.numCuboids; i++) {

            const x = random() * props.worldSize - props.worldSize / 2;
            const y = random() * 500 - 250;
            const z = random() * props.worldSize - props.worldSize / 2;

            if (Math.abs(x) <= 150 && z > -50) {
                continue;
            }

            transform.setPosition(x, y, z);
            instancedMeshRef.current.setMatrixAt(i, transform)
        }
    }, [props.numCuboids, props.worldSize, random]);

    const rotationSpeed = useRef(0);

    useFrame((state, delta)  => {
        if (!props.lift || !instancedMeshRef.current || isListFinished) {
            return;
        }

        const deltaX = delta * LIFT_SPEED;
        const currentGluedIndexes = [...gluedIndexes.current];
        let minY = undefined;

        for (let i = 0; i < props.numCuboids; i++) {
            if (currentGluedIndexes.indexOf(i) !== -1) {
                minY = 0;
                continue;
            }

            const matrix = new Matrix4();
            instancedMeshRef.current.getMatrixAt(i, matrix);
            const position = new Vector3().setFromMatrixPosition(matrix);
            position.add(new Vector3(0,deltaX,0));

            if ((typeof minY === "undefined") || position.y < minY) {
                minY = position.y;
            }

            matrix.setPosition(position);
            instancedMeshRef.current.setMatrixAt(i, matrix);
        }

        if (currentGluedIndexes.length === 0 && !!minY && minY > 2000) {
            setIsListFinished(true);
        }

        instancedMeshRef.current.rotateY(rotationSpeed.current);
        rotationSpeed.current -= delta/10;
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    });

    useFrame((state, delta) => {
        if (!instancedMeshRef.current) {
            return;
        }

        instancedMeshRef.current.rotateY(0.003);
    });

    return (
        <instancedMesh
            args={[null as unknown as BufferGeometry, null as unknown as MeshStandardMaterial, props.numCuboids]}
            ref={instancedMeshRef}
        >
            <meshStandardMaterial
                attach="material"
                color="white"
            />
            <boxBufferGeometry
                attach="geometry"
                args={[20, 20, 20]}
            />
        </instancedMesh>
    );
}