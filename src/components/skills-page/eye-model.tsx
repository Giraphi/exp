import React, {RefObject, useContext, useEffect, useMemo, useRef} from "react";
import useWindowWidth from "../../hooks/use-window-width";
import MousePositionContext from "../../contexts/mouse-position-context";
import {useGLTF} from "@react-three/drei";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Group} from "three";
import useDevice from "../../hooks/use-device";
import {CameraPositionContext} from "../../contexts/camera-position-context";
import {useFrame, useThree} from "@react-three/fiber";

interface HelperCoordinates {
    fixedZ: number;
    eyePositionY: number;
    YOffset: number;
}

export default function EyeModel() {
    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;
    const invalidatePosition = useContext(MousePositionContext).invalidatePosition;
    const gltf = useGLTF('/exp/models/eye/scene.gltf') as GLTF;
    const ref = useRef<Group>(null);
    const device = useDevice();
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;
    const canvasSize = useThree().size;


    const helperCoordinates: HelperCoordinates = useMemo(() => {
        // // if (!bannerRef.current) {
        // //     return;
        // // }
        // // console.log(size);
        //
        // if (device === "small") {
        //     return {
        //         fixedZ: -300,
        //         eyePositionY: 100,
        //         YOffset: -0.23 * canvasSize.height,
        //     }
        // }
        return {
            fixedZ: -300,
            eyePositionY: 100,
            YOffset: -0.23 * canvasSize.height,
        }
    }, [canvasSize.height]);

    useFrame(() => {
        if (!ref.current || !ref || !mousePositionRef) {
            return;
        }

        if (!mousePositionRef.current) {
            ref.current.lookAt(initialCameraPosition);
            return;
        }

        ref.current.lookAt(
            mousePositionRef.current.x - canvasSize.width/2,
            -mousePositionRef.current.y + canvasSize.height/2 + helperCoordinates.eyePositionY + helperCoordinates.YOffset,
            // -mousePositionRef.current.y + canvasSize.height/2 + helperCoordinates.eyePositionY,
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
        <primitive
            ref={ref}
            object={gltf.scene}
            position={[0, helperCoordinates.eyePositionY, -200]}
        />
    );
}