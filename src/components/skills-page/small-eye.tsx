import React from "react";
import CursorFollowModel from "./cursor-follow-model/cursor-follow-model";
import {EyeGLTFResult} from "../models/eye-model";
import useDevice from "../../hooks/use-device";
import ScrollRotateModel from "./scroll-rotate-model/scroll-rotate-model";

export interface SmallEyeProps {
    gltf: EyeGLTFResult;
    z: number;
}

export default function SmallEye(props: SmallEyeProps) {
    const device = useDevice();

    return (
        <>

            {device === "small" &&
                <ScrollRotateModel
                    z={props.z}
                    gltf={props.gltf}
                />
            }

            {device !== "small" &&
            <CursorFollowModel
                z={props.z}
                gltf={props.gltf}
            />
            }
        </>
    );
}