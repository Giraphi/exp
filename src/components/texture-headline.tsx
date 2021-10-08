import React from "react";
import { DoubleSide } from "three";

import useTextTexture from "../hooks/use-text-texture";
import { colorSkills } from "../style/constants";
import useDevice from "../hooks/use-device";

export default function TextureHeadline() {
    const deviceId = useDevice();

    const { texture, scale } = useTextTexture("Skills", {
        color: colorSkills,
        font: "InkedBones",
        size: 100,
        scale: 1,
        borderSize: 100,
    });

    return (
        <>
            <mesh position={[0, 0, 300]} scale={scale} rotation={[-0.2, -0.07, -0.03]}>
                <meshBasicMaterial map={texture} side={DoubleSide} transparent={true} color={colorSkills} />
                <planeGeometry />
            </mesh>
            {/*{deviceId !== "small" && texture &&*/}
            {/*}*/}

            {/*{deviceId === "small" && texture &&*/}
            {/*    <mesh*/}
            {/*        position={[0,50,300]}*/}
            {/*        scale={scale}*/}
            {/*        rotation={[-0.2, -0.07, -0.04]}*/}
            {/*    >*/}
            {/*        <meshBasicMaterial*/}
            {/*            map={texture}*/}
            {/*            side={DoubleSide}*/}
            {/*            transparent={true}*/}
            {/*            color={colorSkills}*/}
            {/*        />*/}
            {/*        <planeGeometry/>*/}
            {/*    </mesh>*/}
            {/*}*/}
        </>
    );
}
