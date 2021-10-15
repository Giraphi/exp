import React from "react";
import { Text } from "@react-three/drei";
import gothic from "../../../fonts/OPTIAuvantGothic-Bold.woff";

export default function StartPageSecretText() {
    return (
        <group position={[0, 100, 1500]} rotation={[0, Math.PI, 0]}>
            <pointLight position={[100, 200, 50]} intensity={200} distance={600} decay={5} color={"white"} />

            <mesh position={[0, 0, -11]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                <boxBufferGeometry args={[480, 20, 30]} />
                <meshStandardMaterial color="deeppink" flatShading={true} />
            </mesh>

            <Text color={"black"} font={gothic} fontSize={20} lineHeight={1}>
                IST ES ZUKUNFT? ODER IST ES VERGANGENHEIT?
            </Text>
        </group>
    );
}
