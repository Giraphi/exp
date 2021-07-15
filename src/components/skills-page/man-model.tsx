import React, {useMemo} from "react";
import useObjAsPrimitive from "../../useObjAsPrimitive";
import {MeshStandardMaterial} from "three";

export default function ManModel() {
    const material = useMemo(() => {
        return new MeshStandardMaterial();
    }, []);

    const model = useObjAsPrimitive("models/man.obj", material);

    return (
        <mesh
            // rotation={props.rotation}
            // position={props.position}
            scale={10}
        >
            {model}
        </mesh>
    );

}