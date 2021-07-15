import React, {useCallback, useEffect, useMemo, useState} from "react";
import {CanvasTexture, DoubleSide, LinearFilter, Mesh} from "three";
import {Vector3} from "three/src/math/Vector3";
import useIsFontLoaded from "../../hooks/use-is-font-loaded";
import useTextTexture from "../../hooks/use-text-texture";

export interface TextureHeadlineProps {
    text: string;
    position: [x:number, y: number, z: number];
}

export default function TextureHeadline(props: TextureHeadlineProps) {
    const {texture, textCanvasWidth, textCanvasHeight} = useTextTexture(props.text,
        {
            color: "lime",
            font: "AuvantGothicBold",
            scale: 0.15,
        }
    );

    const textScale: Vector3 = useMemo(() => {
        const labelBaseScale = 0.15;
        return new Vector3(
            textCanvasWidth * labelBaseScale,
            textCanvasHeight * labelBaseScale,
            0
        );
        // return new Vector3(
        //     textCanvasWidth * labelBaseScale,
        //     textCanvasHeight * labelBaseScale,
        //     0
        // );
    }, [textCanvasHeight, textCanvasWidth])

    return (
        <>
            {texture &&
                <mesh
                    position={props.position}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={textScale}
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