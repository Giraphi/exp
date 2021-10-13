import React from "react";
import SmallEyeCursorFollow from "./small-eye-cursor-follow";
import { EyeGLTFResult } from "../../../models/eye-model";
import useDevice from "../../../../hooks/use-device";
import SmallEyeScrollRotate from "./small-eye-scroll-rotate";

export interface SmallEyeProps {
    gltf: EyeGLTFResult;
    z: number;
}

export default function SmallEye(props: SmallEyeProps) {
    const device = useDevice();

    return (
        <>
            {device === "small" && <SmallEyeScrollRotate z={props.z} gltf={props.gltf} />}

            {device !== "small" && <SmallEyeCursorFollow z={props.z} gltf={props.gltf} />}
        </>
    );
}
