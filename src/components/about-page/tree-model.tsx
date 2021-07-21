import React, {useMemo} from "react";
import {MeshStandardMaterial} from "three";
import useObjAsPrimitive from "../../hooks/use-obj-as-primitive";

export default function TreeModel() {
    const material = useMemo(() => {
        return new MeshStandardMaterial();
    }, []);

    const model = useObjAsPrimitive("/exp/models/pharaoh.obj", material);

    return (
        <mesh
            position={[0,0,0]}
            // scale={100}
        >
            {model}
        </mesh>
    );
}