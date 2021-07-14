import React, {useMemo} from "react";
import useObjAsPrimitive from "../../useObjAsPrimitive";
import {
    LinearFilter,
    MeshStandardMaterial,
    RepeatWrapping,
    TextureLoader
} from "three";
import {useLoader, Vector3} from "@react-three/fiber";
import backHomeGothic from '../../images/back-home-gothic.png';

export interface BackHomeModelProps {
    modelUrl: string;
    position?: Vector3;
    scale?: Vector3;
    rotation?: [x:number, y:number, z:number];
}

export default function BackHomeModel(props: BackHomeModelProps) {
    const texture = useLoader(TextureLoader, backHomeGothic)

    const material = useMemo(() => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.minFilter = LinearFilter;
        const imageRatio = texture.image.width/texture.image.height
        const repeats = 20;
        console.log(repeats);
        texture.repeat.set(repeats/imageRatio, repeats);
        return new MeshStandardMaterial({map: texture});
    }, [texture]);

    const model = useObjAsPrimitive(props.modelUrl, material);

    return (
        // <group
        //     rotation={props.rotation}
        //     position={props.position}
        //     scale={props.scale}
        // >
            <mesh
                rotation={props.rotation}
                position={props.position}
                scale={props.scale}
            >
                {model}
            </mesh>
        // </group>
    );
}