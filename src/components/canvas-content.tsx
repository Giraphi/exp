import React, {useEffect} from "react";
import BirdCamera from "./bird-camera";
import World from "./world";
import {Canvas, useThree} from "react-three-fiber";
import {PCFSoftShadowMap} from "three";
import Lightbulb from "./lightbulb";
import {Vector3} from "three/src/math/Vector3";

export default function CanvasContent() {
    const {gl} = useThree();

    useEffect(() => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
    }, [gl]);

    return (
        <>
            <BirdCamera position={[0, 200, 1000]}/>

            <World numCuboids={400}/>
        </>
    );
}