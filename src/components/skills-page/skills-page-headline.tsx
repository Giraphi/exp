import React from "react";
import {Text} from "@react-three/drei";
import {colorSkills} from "../../style/constants";
import inkedBones from "../../fonts/inked-bones.woff";
import useDevice from "../../hooks/use-device";


export default function SkillsPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" &&
                <Text
                    color={colorSkills}
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
                    color={colorSkills}
                    fontSize={90}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0,0,300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    Skills
                </Text>
            }
        </>
    );
}