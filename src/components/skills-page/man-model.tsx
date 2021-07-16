import React, {useMemo} from "react";
import useObjAsPrimitive from "../../useObjAsPrimitive";
import {MeshStandardMaterial} from "three";

export default function ManModel() {
    const material = useMemo(() => {
        return new MeshStandardMaterial();
    }, []);

    const model = useObjAsPrimitive("exp/models/man.obj", material);

    return (
        <mesh
            position={[0,-100,0]}
            scale={15}
        >
            {model}
        </mesh>
    );

}