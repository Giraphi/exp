import React from "react";
import {Text} from "@react-three/drei";
import useDevice from "../../hooks/use-device";
import blackMetal from "../../fonts/black-metal.ttf";
// import auvantGothic from "../../fonts/black-metal.ttf";

export default function SkillsPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" &&
                <Text
                    color={"black"}
                    fontSize={90}
                    lineHeight={1}
                    letterSpacing={0.1}
                    font={blackMetal}
                    position={[0,0,300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    Skills
                </Text>
            }
            {deviceId === "small" &&
                <Text
                    color={"black"}
                    fontSize={80}
                    letterSpacing={0.1}
                    lineHeight={1}
                    font={blackMetal}
                    position={[0,50,300]}
                    rotation={[-0.3, -0.07, -0.03]}
                >
                    Skills
                </Text>
            }
        </>
    );
}