import React from "react";
import {DoubleSide} from "three";

import useTextTexture from "../../hooks/use-text-texture";
import {colorSkills} from "../../style/constants";
import useDevice from "../../hooks/use-device";

export default function TextureHeadline() {
    const deviceId = useDevice();

    const {texture, scale} = useTextTexture("Skills",
        {
            color: colorSkills,
            font: "InkedBones",
            size: 1000,
            scale: 0.1,
        }
    );

    const small = useTextTexture("Skills",
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
                    position={[0,0,400]}
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
                        position={[0,60,300]}
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