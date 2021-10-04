import React, {ReactNode, useEffect, useState} from "react";
import ThreeSetupBirdCamera from "./three-setup-bird-camera";
import {PCFSoftShadowMap} from "three";
import {useFrame, useThree} from "@react-three/fiber";

export interface ThreeSetupCanvasContentProps {
    children: ReactNode;
    onLoadFinished?: () => void;
}

export default function ThreeSetupCanvasContent(props: ThreeSetupCanvasContentProps) {
    const {gl} = useThree();
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;

        gl.setPixelRatio(window.devicePixelRatio)
    }, [gl]);


    useFrame((state, delta) => {
        if (isReady || !props.onLoadFinished) {
            return;
        }

        const fps = delta ? 1/delta : 0;

        if (fps <= 20) {
            return;
        }

        setIsReady(true);
        props.onLoadFinished();
    });

    return (
        <>
            <ThreeSetupBirdCamera/>
            {props.children}
        </>
    );
}