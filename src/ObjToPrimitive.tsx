import React, {useMemo, useState} from "react";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

import {Group, Material, Mesh} from "three";


export default function ObjToPrimitive({url, mat}: { url: string, mat: Material }) {
    const [obj, setObj] = useState<Group>();
    useMemo(() => new OBJLoader().load(url, setObj), [url]);

    if (obj) {
        obj.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = mat;
            }
        });
        return <primitive object={obj}/>;
    }
    return null;
}