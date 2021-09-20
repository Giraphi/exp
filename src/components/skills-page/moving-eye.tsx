import React, {useContext, useEffect, useMemo, useRef} from "react";
import MousePositionContext from "../../contexts/mouse-position-context";
import {Group} from "three";
import useDevice from "../../hooks/use-device";
import {CameraPositionContext} from "../../contexts/camera-position-context";
import {useFrame, useThree} from "@react-three/fiber";
import EyeModel, {EyeGLTFResult} from "../models/eye-model";

export interface HelperCoordinates {
    fixedZ: number;
    eyePositionY: number;
    YOffset: number;
}

export interface MovingEyeProps {
    eyeGltf: EyeGLTFResult;
}

export default function MovingEye(props: MovingEyeProps) {
    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;
    const invalidatePosition = useContext(MousePositionContext).invalidatePosition;
    const ref = useRef<Group>(null);
    const device = useDevice();
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const canvasSize = useThree().size;

    const helperCoordinates: HelperCoordinates = useMemo(() => {
        return {
            fixedZ: -300,
            eyePositionY: 100,
            YOffset: -0.23 * canvasSize.height,
        }
    }, [canvasSize.height]);

    useFrame(() => {
        if (device === "small") {
            return;
        }

        if (!ref.current || !ref || !mousePositionRef) {
            return;
        }

        if (!mousePositionRef.current) {
            ref.current.lookAt(initialCameraPosition);
            return;
        }

        ref.current.lookAt(
            mousePositionRef.current.x - canvasSize.width / 2,
            -mousePositionRef.current.y + canvasSize.height / 2 + helperCoordinates.eyePositionY + helperCoordinates.YOffset,
            helperCoordinates.fixedZ,
        );
    });

    useEffect(() => {
        if (device !== "small") {
            return;
        }

        invalidatePosition();
    }, [device, invalidatePosition])

    return (
        <group
            ref={ref}
            position={[0, helperCoordinates.eyePositionY, -200]}
        >
            <EyeModel eyeGltfResult={props.eyeGltf}/>
        </group>
    );
}