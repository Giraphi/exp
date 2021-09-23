import React from "react";
import useDevice from "../../../hooks/use-device";
import {Text} from "@react-three/drei";
import inkedBones from "../../../fonts/inked-bones.woff";

export default function AboutPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" &&
                <Text
                    color={"#009905"}
                    fontSize={90}
                    letterSpacing={0.1}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0,30,300]}
                    rotation={[-0.2, -0.07, -0.03]}
                >
                    Résumé
                </Text>
            }
            {deviceId === "small" &&
                <Text
                    color={"#009905"}
                    fontSize={50}
                    lineHeight={1}
                    font={inkedBones}
                    position={[0,50,300]}
                    rotation={[-0.3, -0.07, -0.03]}
                >
                    résumé
                </Text>
            }
        </>
    );
}