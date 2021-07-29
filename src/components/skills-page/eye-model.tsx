import React, {RefObject, useContext} from "react";
import useObjWTexture from "../../hooks/use-obj-w-texture";
import {useFrame} from "@react-three/fiber";
import useWindowWidth from "../../hooks/use-window-width";
import MousePositionContext from "../../contexts/mouse-position-context";

export interface EyeModelProps {
    bannerRef: RefObject<HTMLDivElement>;
}

export default function EyeModel(props: EyeModelProps) {
    const eyeObject = useObjWTexture("/exp/models/eyeball/eyeball.obj", "/exp/models/eyeball/eyeball.mtl");
    const mousePositionRef = useContext(MousePositionContext)
    const windowWidth = useWindowWidth();

    const cameraZ = 300;
    const eyePositionY = 100;
    const YOffset = -180;

    useFrame(() => {
        if (!props.bannerRef.current || !mousePositionRef?.current) {
            return;
        }

        eyeObject.lookAt(
            mousePositionRef.current.x - windowWidth/2,
            -mousePositionRef.current.y + props.bannerRef.current.clientHeight/2 + eyePositionY + YOffset,
            cameraZ
        );
    });

    return (
        <primitive
            object={eyeObject}
            scale={[60, 60, 60]}
            position={[0, eyePositionY, -200]}
        />
    );
}