import React from "react";
import {MeshStandardMaterial} from "three";
import useWindowWidth from "../../hooks/use-window-width";
import ObjToPrimitive from "../../ObjToPrimitive";

export default function SkillsPageWorld() {
    const windowWidth = useWindowWidth();
    // const mat = new MeshNormalMaterial();

    const mat = new MeshStandardMaterial(
        {
            color: "white",
        }
    )

    return (
        <>
            {/*<ambientLight color="white" intensity={0.05}/>*/}
            <group
                position={[-windowWidth / 5, 200, 0]}
            >


                {/*<pointLight*/}
                {/*    color={"#ffffff"}*/}
                {/*    intensity={3}*/}
                {/*    distance={1000}*/}
                {/*    decay={1}*/}
                {/*    position={[-30, 0, 0]}*/}
                {/*    castShadow={true}>*/}

                {/*    <mesh*/}
                {/*        position={[0, 0, 0]}*/}
                {/*    >*/}
                {/*        <meshStandardMaterial*/}
                {/*            // args={[{emissive: "0xffffee", emissiveIntensity: 10, color: "0x000000"}]}*/}
                {/*            emissive={new Color("#ffffee")}*/}
                {/*            emissiveIntensity={1}*/}
                {/*            color={"#000000"}*/}

                {/*        />*/}
                {/*        <sphereGeometry args={[10, 16, 8]}/>*/}
                {/*    </mesh>*/}
                {/*</pointLight>*/}


                <pointLight
                    color={"#ffffff"}
                    intensity={3}
                    distance={1000}
                    decay={10}
                    position={[40, 20, 40]}
                    castShadow={true}
                >
                    {/*<mesh*/}
                    {/*    position={[0, 0, 0]}*/}
                    {/*>*/}
                    {/*    <meshStandardMaterial*/}
                    {/*        // args={[{emissive: "0xffffee", emissiveIntensity: 10, color: "0x000000"}]}*/}
                    {/*        emissive={new Color("#ffffee")}*/}
                    {/*        emissiveIntensity={1}*/}
                    {/*        color={"#000000"}*/}

                    {/*    />*/}
                    {/*    <sphereGeometry args={[10, 16, 8]}/>*/}
                    {/*</mesh>*/}
                </pointLight>


                <mesh
                    position={[0, -200, 0]}
                    scale={[10, 10, 10]}
                    receiveShadow={true}
                    castShadow={true}
                >
                    {ObjToPrimitive({url: "models/FinalBaseMesh.obj", mat})}
                </mesh>
            </group>


        </>
    );
}