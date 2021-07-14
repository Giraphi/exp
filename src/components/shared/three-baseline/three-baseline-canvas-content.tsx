import React, {ReactNode, useEffect} from "react";
import ThreeBaselineBirdCamera from "./three-baseline-bird-camera";
import StartPageWorld from "../../start-page/start-page-world";
import {PCFSoftShadowMap} from "three";
import {useThree} from "@react-three/fiber";

export interface ThreeBaselineCanvasContentProps {
    children: ReactNode;
}

export default function ThreeBaselineCanvasContent(props: ThreeBaselineCanvasContentProps) {
    const {gl} = useThree();

    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;

        gl.setPixelRatio(window.devicePixelRatio)
    }, [gl]);

    return (
        <>
            <ThreeBaselineBirdCamera position={[0, 200, 700]}/>
            {props.children}
            {/*<World*/}
            {/*    numCuboids={170}*/}
            {/*    size={1000}*/}
            {/*/>*/}
        </>
    );
}