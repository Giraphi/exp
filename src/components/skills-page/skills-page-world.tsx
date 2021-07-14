import React from "react";
import {Color, MeshNormalMaterial, MeshStandardMaterial} from "three";
import useWindowWidth from "../../hooks/use-window-width";
import ObjToPrimitive from "../../ObjToPrimitive";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();
    // const mat = new MeshNormalMaterial();

    const mat = new MeshStandardMaterial(
        {
            emissive: new Color("#ffffee"),
            emissiveIntensity: 1,
            color: "#000000",
        }
    )

    return (
        <>
            {/*<ambientLight color="white" intensity={0.5}/>*/}

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

                {/*<ambientLight color="white" intensity={0.1}/>*/}

            </pointLight>

            <mesh
                position={[- windowWidth/5,-30,0]}
                scale={[10,10,10]}
                receiveShadows={true}
            >
                {ObjToPrimitive({ url: "models/FinalBaseMesh.obj", mat })}
            </mesh>

        </>
    );
}