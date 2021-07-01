import React, {useEffect} from "react";
import BirdCamera from "./bird-camera";
import World from "./world";
import {PCFSoftShadowMap} from "three";
import {useThree} from "@react-three/fiber";

export default function CanvasContent() {
    const {gl} = useThree();

    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;

        gl.setPixelRatio(window.devicePixelRatio)
    }, [gl]);

    return (
        <>
            <BirdCamera position={[0, 200, 800]}/>

            <World
                numCuboids={200}
                size={1000}
            />
        </>
    );
}