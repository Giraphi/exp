import React, {useMemo, useState} from "react";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";
import Cuboids from "./cuboids";

export interface WorldProps {
    numCuboids: number;
    size: number;
}

export default function StartPageWorld(props: WorldProps) {
    const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);

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
            {/*<ambientLight color="white" intensity={0.1}/>*/}

            <Cuboids numCuboids={props.numCuboids} worldSize={props.size} lift={isLightbulbClicked}/>

            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[2]}
                text={"THIRD"}
                height={175}
                path={"skills"}
            />
            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[0]}
                text={"FIRST"}
                height={160}
                path={"skills"}
            />
            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[1]}
                text={"SECOND"}
                height={185}
                path={"skills"}
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