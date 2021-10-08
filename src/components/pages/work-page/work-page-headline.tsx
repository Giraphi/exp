import React from "react";
import useDevice from "../../../hooks/use-device";
import { Text } from "@react-three/drei";
import inkedBones from "../../../fonts/inked-bones.woff";
import { colorWork } from "../../../style/constants";

export default function WorkPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" && (
                <Text
                    color={colorWork}
                    fontSize={70}
                    letterSpacing={0.1}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0, 0, 300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    Work
                </Text>
            )}
            {deviceId === "small" && (
                <Text
                    color={colorWork}
                    fontSize={50}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0, 0, 300]}
                    rotation={[-0.3, -0.07, -0.03]}
                >
                    Work
                </Text>
            )}
        </>
    );
}
