import React from "react";
import {DoubleSide} from "three";

import useTextTexture from "../../hooks/use-text-texture";
import {colorSkills} from "../../style/constants";
import useDevice from "../../hooks/use-device";

export interface TextureHeadlineProps {
    text: string;
    position: [x: number, y: number, z: number];
    positionSm: [x: number, y: number, z: number];
}

export default function TextureHeadline(props: TextureHeadlineProps) {
    const deviceId = useDevice();

    const {texture, scale} = useTextTexture(props.text,
        {
            color: colorSkills,
            font: "InkedBones",
            size: 1000,
            scale: 0.1,
        }
    );

    const small = useTextTexture(props.text,
        {
            color: colorSkills,
            font: "InkedBones",
            size: 1000,
            scale: 0.1,
        }
    );

    // console.log(deviceId);

    return (
        <>
                {deviceId !== "small" && texture &&
                <mesh
                    position={props.position}
                    scale={scale}
                    rotation={[-0.2, -0.07, -0.01]}
                >
                    <meshBasicMaterial
                        map={texture}
                        side={DoubleSide}
                        transparent={true}
                        color={colorSkills}
                    />
                    <planeGeometry/>
                </mesh>
                }

                {deviceId === "small" && small.texture &&
                    <mesh
                        position={props.positionSm}
                        scale={small.scale}
                        rotation={[-0.2, -0.07, -0.01]}
                    >
                        <meshBasicMaterial
                            map={small.texture}
                            side={DoubleSide}
                            transparent={true}
                            color={colorSkills}
                        />
                        <planeGeometry/>
                    </mesh>
                }

        </>
    );
}