import React, { Suspense, useState } from "react";
import { colorWork } from "../../../style/constants";
import FlyingPageObjects from "../../flying-page-objects";
import PageMenu from "../../page-menu";
import WorkPageHeadline from "./work-page-headline";
import HandModel, { HandGLTFResult } from "../../models/hand-model";

export interface WorkPageWorldProps {
    handGltf: HandGLTFResult;
}

export default function WorkPageWorld(props: WorkPageWorldProps) {
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    return (
        <>
            <ambientLight color="white" intensity={0.01} />
            <WorkPageHeadline />

            <pointLight color={colorWork} intensity={2} distance={1000} decay={1} position={[420, 1000, 40]} castShadow={true}></pointLight>

            <group position={[0, 0, -200]}>
                <FlyingPageObjects numObjects={50} worldSize={1000} lift={isMenuClicked}>
                    <meshStandardMaterial attach="material" color="white" />
                    <sphereGeometry attach="geometry" args={[5, 32, 32]} />
                </FlyingPageObjects>
                <Suspense fallback={null}>
                    <group scale={[400, 400, 400]} rotation={[6.5, 1.3, -1.0]} position={[0, 20, 0]}>
                        <HandModel handGltfResult={props.handGltf} />
                    </group>
                </Suspense>
            </group>

            <PageMenu onClick={() => setIsMenuClicked(true)} />
        </>
    );
}
