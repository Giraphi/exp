import React, { useMemo } from "react";
import useObjAsPrimitive from "../hooks/use-obj-as-primitive";
import { LinearFilter, MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";
import { useLoader, Vector3 } from "@react-three/fiber";
import backHomeGothic from "../images/back-home-gothic.png";

export interface BackHomeModelProps {
    modelUrl: string;
    repeats: number;
    position?: Vector3;
    scale?: Vector3;
    rotation?: [x: number, y: number, z: number];
}

export default function TextureModel(props: BackHomeModelProps) {
    const texture = useLoader(TextureLoader, backHomeGothic);

    const material = useMemo(() => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.minFilter = LinearFilter;
        const imageRatio = texture.image.width / texture.image.height;
        const repeats = props.repeats;

        texture.repeat.set(repeats / imageRatio, repeats);
        return new MeshStandardMaterial({ map: texture });
    }, [props.repeats, texture]);

    const model = useObjAsPrimitive(props.modelUrl, material);

    return (
        <mesh rotation={props.rotation} position={props.position} scale={props.scale}>
            {model}
        </mesh>
    );
}
