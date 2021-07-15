import React from "react";
import {DoubleSide} from "three";

import useTextTexture from "../../hooks/use-text-texture";

export interface TextureHeadlineProps {
    text: string;
    position: [x:number, y: number, z: number];
}

export default function TextureHeadline(props: TextureHeadlineProps) {
    const {texture,scale} = useTextTexture(props.text,
        {
            color: "lime",
            font: "InkedBones",
            size: 1000,
            scale: 0.1,
        }
    );

    return (
        <>
            {texture &&
                <mesh
                    position={props.position}
                    scale={scale}
                >
                    <meshBasicMaterial
                        map={texture}
                        side={DoubleSide}
                        transparent={true}
                    />
                    <planeGeometry
                        args={[1, 1]}
                    />
                </mesh>
            }
        </>
    );
}