import { useFrame, useThree } from "@react-three/fiber";
import {Group, Mesh} from "three";
import { RefObject, useContext, useEffect } from "react";
import useDevice from "./use-device";
import { Vector3 } from "three/src/math/Vector3";
import { useTransform, useViewportScroll } from "framer-motion";
import MousePositionContext from "../contexts/mouse-position-context";
import { CameraPositionContext } from "../contexts/camera-position-context";

const xAxis = new Vector3(1, 0, 0);
const yAxis = new Vector3(0, 1, 0);

export interface CursorFollowConfig {
    fixedZ: number;
    modelPositionY: number;
    YOffset: number;
}

export interface ScrollRotateConfig {
    axis: "x" | "y";
    targetAngle: number;
}

export default function useCursorFollowBanner(ref: RefObject<Group | Mesh> | null, config: CursorFollowConfig, configMobile: ScrollRotateConfig) {
    const device = useDevice();
    const canvasSize = useThree().size;
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const { scrollY } = useViewportScroll();
    const rotationPercentage = useTransform(scrollY, [0, 400], [0, 1]);
    const invalidatePosition = useContext(MousePositionContext).invalidatePosition;

    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;

    useEffect(() => {
        if (device !== "small") {
            return;
        }

        invalidatePosition();
    }, [device, invalidatePosition]);

    useFrame(() => {
        if (!ref || !ref.current) {
            return;
        }

        if (device === "small") {
            const axis = configMobile.axis === "x" ? xAxis : yAxis;
            ref.current.setRotationFromAxisAngle(axis, rotationPercentage.get() * configMobile.targetAngle);
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
            -mousePositionRef.current.y + canvasSize.height / 2 + config.modelPositionY + config.YOffset * canvasSize.height,
            config.fixedZ
        );
    });
}
