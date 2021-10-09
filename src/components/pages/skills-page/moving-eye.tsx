import React, { useContext, useEffect, useMemo, useRef } from "react";
import MousePositionContext from "../../../contexts/mouse-position-context";
import { Group } from "three";
import useDevice from "../../../hooks/use-device";
import { CameraPositionContext } from "../../../contexts/camera-position-context";
import { useFrame, useThree } from "@react-three/fiber";
import EyeModel, { EyeGLTFResult } from "../../models/eye-model";
import { useTransform, useViewportScroll } from "framer-motion";
import { Vector3 } from "three/src/math/Vector3";

export interface HelperCoordinates {
    fixedZ: number;
    eyePositionY: number;
    YOffset: number;
}

export interface MovingEyeProps {
    eyeGltf: EyeGLTFResult;
}

const xAxis = new Vector3(1, 0, 0);

export default function MovingEye(props: MovingEyeProps) {
    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;
    const invalidatePosition = useContext(MousePositionContext).invalidatePosition;
    const ref = useRef<Group>(null);
    const device = useDevice();
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const canvasSize = useThree().size;

    const { scrollY } = useViewportScroll();
    const rotationPercentage = useTransform(scrollY, [0, 200], [0.05, 1]);

    const helperCoordinates: HelperCoordinates = useMemo(() => {
        return {
            fixedZ: 300,
            eyePositionY: 50,
            YOffset: -0.03 * canvasSize.height,
        };
    }, [canvasSize.height]);

    useFrame(() => {
        if (!ref.current || !ref) {
            return;
        }

        if (device === "small") {
            // ref.current.lookAt(initialCameraPosition);

            ref.current.setRotationFromAxisAngle(xAxis, rotationPercentage.get() * Math.PI * -0.75);
            return;
        }

        if (!mousePositionRef) {
            return;
        }

        if (!mousePositionRef.current) {
            ref.current.lookAt(initialCameraPosition);
            return;
        }

        ref.current.lookAt(
            mousePositionRef.current.x - canvasSize.width / 2,
            -mousePositionRef.current.y + canvasSize.height / 2 + helperCoordinates.eyePositionY + helperCoordinates.YOffset,
            helperCoordinates.fixedZ
        );
    });

    useEffect(() => {
        if (device !== "small") {
            return;
        }

        invalidatePosition();
    }, [device, invalidatePosition]);

    return (
        <group ref={ref} position={[0, helperCoordinates.eyePositionY, 0]}>
            <EyeModel eyeGltfResult={props.eyeGltf} />
        </group>
    );
}
