import React from "react";
import {Color} from "three";
import useWindowWidth from "../../hooks/use-window-width";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();

    return (
        <>
            <pointLight
                color={"#ffffff"}
                intensity={1}
                distance={500}
                decay={2}
                position={[- windowWidth/5,200,0]}
                castShadow={true}
            >
                <mesh
                    position={[0,0,0]}
                >
                    <meshStandardMaterial
                        // args={[{emissive: "0xffffee", emissiveIntensity: 10, color: "0x000000"}]}
                        emissive={new Color("#ffffee")}
                        emissiveIntensity={1}
                        color={"#000000"}

                    />
                    <sphereGeometry args={[10, 16, 8]}/>
                </mesh>
            </pointLight>
        </>
    );
}