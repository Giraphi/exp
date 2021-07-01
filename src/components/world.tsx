import React, {useCallback, useMemo, useState} from "react";
import {BoxBufferGeometry, MeshStandardMaterial} from "three";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import useRandomGenerator from "../hooks/use-random";

export interface WorldProps {
    numCuboids: number;
    size: number;
}

export default function World(props: WorldProps) {
    const [cuboidMaterialNode, setCuboidMaterialNode] = useState<MeshStandardMaterial>();
    const [cuboidGeometryNode, setCuboidGeometryNode] = useState<BoxBufferGeometry>();
    const random = useRandomGenerator(55);

    const cuboidMaterial = useCallback(node => {
        if (node === null) {
            return;
        }

        setCuboidMaterialNode(node);
    }, []);

    const cuboidGeometry = useCallback(node => {
        if (node === null) {
            return;
        }

        setCuboidGeometryNode(node);
    }, []);

    const cuboids = useMemo(() => {
        if (!cuboidGeometryNode || !cuboidGeometryNode) {
            return;
        }

        function getPosition() {
            const x = random() * props.size - props.size/2;
            const y = 0;
            const z = random() * props.size - props.size/2;
            return [x,y,z];
        }

        return (
            <>
                {[...Array(props.numCuboids)].map((e, i) =>
                    {
                        const position = getPosition();
                        if (!position) return;
                        return (
                            <mesh
                                key={i}
                                position={[random() * props.size - props.size/2, 0, random() * props.size - props.size/2]}
                                scale={[20, random() * 160 + 100, 20]}
                                material={cuboidMaterialNode}
                                geometry={cuboidGeometryNode}
                                castShadow={true}
                                receiveShadow={true}
                            />
                        )
                    }
                )}
            </>
        )
    }, [cuboidGeometryNode, cuboidMaterialNode, props.numCuboids, props.size, random]);

    const lightbulbPositions = useMemo(() => {
        return [
            new Vector3(0, 0, 100),
            new Vector3(115, 0, -105),
            new Vector3(-100, 0, 35)
        ]
    }, []);

    return (
        <>
            {/*<fog attach="fog" args={['#53FAEB', 0.002, 1000]} />*/}
            {/*<directionalLight position={[100, 100, 100]} color="ddred" castShadow={true}/>*/}
            {/*<directionalLight position={[-1, -1, -1]} color="#ffdw738" castShadow={true} />*/}
            <ambientLight color="white" intensity={0.001}/>

            <meshStandardMaterial
                ref={cuboidMaterial}
                attach="material"
                color="white"
            />
            <boxBufferGeometry
                ref={cuboidGeometry}
                attach="geometry"
                args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />

            {cuboids}

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