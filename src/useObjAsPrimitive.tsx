import React, {useEffect, useMemo, useState} from "react";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

import {Group, Material, Mesh} from "three";


export default function useObjAsPrimitive(url: string, mat: Material) {
    const [obj, setObj] = useState<Group>();

    useEffect(() => {
        new OBJLoader().load(url, setObj);
    }, [url])

    return useMemo(() => {
        if (obj) {
            obj.traverse((child) => {
                if (child instanceof Mesh) {
                    child.material = mat;
                }
            });
            return (
                <primitive
                    object={obj} />
            );
        }
        return <></>;
    }, [mat, obj]);
    // new OBJLoader().load(url, setObj)

}