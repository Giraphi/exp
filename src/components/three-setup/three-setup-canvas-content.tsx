import React, {ReactNode, useEffect, useRef, useState} from "react";
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
    const frameCountRef = useRef(0);

    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;

        gl.setPixelRatio(window.devicePixelRatio)
    }, [gl]);

    useFrame(() => {
        if (isReady || !props.onLoadFinished) {
            return;
        }

        frameCountRef.current += 1;
        if ((frameCountRef.current) > 20) {
            setIsReady(true);
            props.onLoadFinished();
        }
    });

    return (
        <>
            <ThreeSetupBirdCamera/>
            {props.children}
        </>
    );
}