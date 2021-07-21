import React from "react";
import useObjWTexture from "../../hooks/use-obj-w-texture";


export default function EyeModel() {
    const eyeObject = useObjWTexture("/exp/models/eyeball/eyeball.obj", "/exp/models/eyeball/eyeball.mtl");

    return (
        <primitive
            object={eyeObject}
            scale={[60, 60, 60]}
            position={[0, 100, -200]}
        />
    );
}