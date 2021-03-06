import React, { useMemo, useState } from "react";
import { Vector3 } from "three/src/math/Vector3";
import StartPageCuboids from "./start-page-cuboids";
import Lightbulb from "../../lightbulb/lightbulb";
import StartPageSecretText from "./start-page-secret-text";

export interface WorldProps {
    numCuboids: number;
}

export default function StartPageWorld(props: WorldProps) {
    const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);

    const lightbulbPositions = useMemo(() => {
        return [new Vector3(0, 0, 100), new Vector3(115, 0, -105), new Vector3(-100, 0, 35)];
    }, []);

    return (
        <>
            <ambientLight color="white" intensity={0.001} />

            <StartPageCuboids numCuboids={props.numCuboids} worldSize={1000} lift={isLightbulbClicked} />

            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[2]}
                text={"WORK"}
                height={175}
                path={"work"}
            />
            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[0]}
                text={"SKILLS"}
                height={160}
                path={"skills"}
            />
            <Lightbulb
                onClick={() => setIsLightbulbClicked(true)}
                position={lightbulbPositions[1]}
                text={"ABOUT ME"}
                height={185}
                path={"about"}
            />

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
                <meshStandardMaterial attach="material" color="white" flatShading={true} />
            </mesh>
            <StartPageSecretText />
        </>
    );
}
