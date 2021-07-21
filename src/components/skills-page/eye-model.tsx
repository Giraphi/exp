import React from "react";
import useObjWTexture from "../../hooks/use-obj-w-texture";
import {useFrame} from "@react-three/fiber";
import useMousePositionRef from "../../hooks/use-mouse-position-ref";
import useWindowWidth from "../../hooks/use-window-width";


export default function EyeModel() {
    const eyeObject = useObjWTexture("/exp/models/eyeball/eyeball.obj", "/exp/models/eyeball/eyeball.mtl");
    const mousePosition = useMousePositionRef();

    const cameraZ = 700;
    const canvasHeight = 618;

    const eyePositionY = 100;
    const windowWidth = useWindowWidth();

    useFrame(() => {
        eyeObject.lookAt(
            mousePosition.current.x - windowWidth/2,
            -mousePosition.current.y + canvasHeight/2 + eyePositionY,
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