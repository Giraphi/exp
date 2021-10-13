import React, { useRef } from "react";
import HandModel, { HandGLTFResult } from "../../models/hand-model";
import { Group } from "three";
import useCursorFollowBannerModel from "../../../hooks/use-cursor-follow-banner";

export interface WorkPageHandModelProps {
    handGltf: HandGLTFResult;
}

export default function WorkPageHandModel(props: WorkPageHandModelProps) {
    const ref = useRef<Group>(null);

    useCursorFollowBannerModel(
        ref,
        {
            fixedZ: 2000,
            modelPositionY: 20,
            YOffset: -0.03,
        },
        { axis: "y", targetAngle: -Math.PI }
    );

    return (
        <group ref={ref}>
            <group rotation={[6.5, 1.3, -1.0]}>
                <HandModel handGltfResult={props.handGltf} />
            </group>
        </group>
    );
}
