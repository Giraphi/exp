import React, {useCallback, useEffect, useMemo, useState} from "react";
import {BoxBufferGeometry, MeshStandardMaterial, PCFSoftShadowMap} from "three";
import {useThree} from "react-three-fiber";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";

export interface WorldProps {
    numCuboids: number;
}

export default function World(props: WorldProps) {
    const [cuboidMaterialNode, setCuboidMaterialNode] = useState<MeshStandardMaterial>();
    const [cuboidGeometryNode, setCuboidGeometryNode] = useState<BoxBufferGeometry>();

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

        return (
            <>
                {[...Array(props.numCuboids)].map((e, i) =>
                    <mesh
                        key={i}
                        position={[Math.random() * 1600 - 800, 0, Math.random() * 1600 - 800]}
                        scale={[20, Math.random() * 160 + 100, 20]}
                        material={cuboidMaterialNode}
                        geometry={cuboidGeometryNode}
                        castShadow={true}
                        receiveShadow={true}
                    />
                )}
            </>
        )
    }, [cuboidGeometryNode, cuboidMaterialNode, props.numCuboids]);

    const lightbulbPositions = useMemo(() => {
        return [
            new Vector3(0, 0, 0),
            new Vector3(70, 0, 0),
            new Vector3(-70, 0, 0)
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

            <Lightbulb position={lightbulbPositions[0]} text={"Contact"}/>
            <Lightbulb position={lightbulbPositions[1]} text={"Projects"}/>
            <Lightbulb position={lightbulbPositions[2]} text={"Skills"}/>

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <planeBufferGeometry
                    attach="geometry"
                    args={[1800, 1800]}
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