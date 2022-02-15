import React from "react";
import useDevice from "../../../hooks/use-device";
import { Text } from "@react-three/drei";
import inkedBones from "../../../fonts/inked-bones.woff";

export default function AboutPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" && (
                <Text
                    color={"#009905"}
                    font={inkedBones}
                    fontSize={70}
                    lineHeight={1}
                    position={[0, 0, 300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    About Me
                </Text>
            )}

            {deviceId === "small" && (
                <Text
                    color={"#009905"}
                    font={inkedBones}
                    fontSize={50}
                    lineHeight={1}
                    position={[0, 10, 300]}
                    rotation={[-0.3, -0.07, -0.03]}
                >
                    About Me
                </Text>
            )}
        </>
    );
}
