import React, {RefObject, useContext, useEffect, useMemo, useRef} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import MousePositionContext from "../../contexts/mouse-position-context";
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Group} from "three";
import useDevice from "../../hooks/use-device";
import {CameraPositionContext} from "../../contexts/camera-position-context";
import {useFrame} from "@react-three/fiber";

export interface EyeModelProps {
    bannerRef: RefObject<HTMLDivElement>;
}

interface HelperCoordinates {
    fixedZ: number;
    eyePositionY: number;
    YOffset: number;
}

export default function EyeModel(props: EyeModelProps) {
    const mousePositionRef = useContext(MousePositionContext)
    const windowWidth = useWindowWidth();
    const gltf = useGLTF('/exp/models/eye/scene.gltf') as GLTF;
    const ref = useRef<Group>(null);
    const device = useDevice();
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;

    // const initialEyeTarget = useMemo(() => {
    //     if (device=== "small") {
    //         return initialCameraPosition
    //     }
    //
    //     if (!mousePositionRef) {
    //         return initialCameraPosition;
    //     }
    //
    //     return mousePositionRef.current
    // }, [device, initialCameraPosition, mousePositionRef])

    const helperCoordinates: HelperCoordinates = useMemo(() => {
        if (device === "small") {
            return {
                fixedZ: -300,
                eyePositionY: 100,
                YOffset: -160,
            }
        }
        return {
            fixedZ: -300,
            eyePositionY: 100,
            YOffset: -260,
        }
    }, [device]);

    useFrame(() => {
        if (!props.bannerRef.current || !ref.current || !ref || !mousePositionRef) {
            return;
        }

        if (!mousePositionRef.current) {
            ref.current.lookAt(initialCameraPosition);
            return;
        }

        ref.current.lookAt(
            mousePositionRef.current.x - windowWidth/2,
            -mousePositionRef.current.y + props.bannerRef.current.clientHeight/2 + helperCoordinates.eyePositionY + helperCoordinates.YOffset,
            helperCoordinates.fixedZ,
        );
    });

    useEffect(() => {
        if (device !== "small" || !ref.current) {
            return;
        }

        ref.current.lookAt(initialEyeTarget);
    }, [device, initialCameraPosition])

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            position={[0, helperCoordinates.eyePositionY, -200]}
        />
    );
}