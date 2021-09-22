import React, {useMemo} from "react";
import useObjAsPrimitive from "../../hooks/use-obj-as-primitive";
import {MeshStandardMaterial} from "three";
import useDevice from "../../hooks/use-device";

export default function ManModel() {
    const device = useDevice();

    const material = useMemo(() => {
        return new MeshStandardMaterial();
    }, []);

    const model = useObjAsPrimitive("/exp/models/man.obj", material);

    return (
        <>
            {device !== "small" &&
                <mesh
                    position={[0,-100,0]}
                    scale={15}
                >
                    {model}
                </mesh>
            }
            {device === "small" &&
                <mesh
                    position={[0,-200,-200]}
                    scale={20}
                >
                    {model}
                </mesh>

            }
        </>
    );

}