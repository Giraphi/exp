import { useLayoutEffect, useState } from "react";
import { Group } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function useObjWTexture(objPath: string, texturePath: string) {
    const [object, setObject] = useState<Group>(new Group());

    useLayoutEffect(() => {
        const mtlLoader = new MTLLoader();
        mtlLoader.load(texturePath, (materials) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(objPath, (object) => {
                setObject(object);
            });
        });
    }, [objPath, texturePath]);

    return object;
}
