import React from "react";
import {Text} from "@react-three/drei";
import inkedBones from "../../fonts/inked-bones.woff";
import useDevice from "../../hooks/use-device";

export default function SkillsPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" &&
                <Text
                    color={"#009900"}
                    fontSize={90}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0,0,300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    Skills
                </Text>
            }
            {deviceId === "small" &&
                <Text
                    color={"#009900"}
                    fontSize={80}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0,50,300]}
                    rotation={[-0.3, -0.07, -0.03]}
                >
                    Skills
                </Text>
            }
        </>
    );
}