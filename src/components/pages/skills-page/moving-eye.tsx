import React, { useRef } from "react";
import { Group } from "three";
import EyeModel, { EyeGLTFResult } from "../../models/eye-model";
import useCursorFollowBanner from "../../../hooks/use-cursor-follow-banner";

export interface MovingEyeProps {
    eyeGltf: EyeGLTFResult;
}

export default function MovingEye(props: MovingEyeProps) {
    const ref = useRef<Group>(null);

    useCursorFollowBanner(
        ref,
        {
            fixedZ: 300,
            modelPositionY: 50,
            YOffset: -0.1,
        },
        { axis: "x", targetAngle: Math.PI * -1.5 }
    );

    return (
        <group ref={ref} position={[0, 50, 0]}>
            <EyeModel eyeGltfResult={props.eyeGltf} />
        </group>
    );
}
