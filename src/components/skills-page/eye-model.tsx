import React, {RefObject, useContext, useEffect, useRef} from "react";
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

export default function EyeModel(props: EyeModelProps) {
    const mousePositionRef = useContext(MousePositionContext)
    const windowWidth = useWindowWidth();
    const gltf = useGLTF('/exp/models/eye/scene.gltf') as GLTF;
    const ref = useRef<Group>(null);
    const device = useDevice();
    const initialCameraPosition = useContext(CameraPositionContext).initialPosition;

    const fixedZ = -300;
    const eyePositionY = 100;
    const YOffset = -260;

    useFrame(() => {
        if (!props.bannerRef.current || !mousePositionRef?.current || !ref.current || !ref) {
            return;
        }

        console.log(mousePositionRef.current);

        ref.current.lookAt(
            mousePositionRef.current.x - windowWidth/2,
            -mousePositionRef.current.y + props.bannerRef.current.clientHeight/2 + eyePositionY + YOffset,
            fixedZ,
        );
    });

    useEffect(() => {
        if (device !== "small" || !ref.current) {
            return;
        }

        ref.current.lookAt(
            initialCameraPosition[0],
            initialCameraPosition[1],
            initialCameraPosition[2]
        );

    }, [device, initialCameraPosition])

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            position={[0, eyePositionY, -200]}
        />
    );
}