import React from "react";
import useDevice from "../../hooks/use-device";
import {Text} from "@react-three/drei";
import graffiti from "../../fonts/Graffiti.ttf";
// import slimWandals from "../../fonts/Graffiti.ttf";
import {colorAbout} from "../../style/constants";

export default function AboutPageHeadline() {
    const deviceId = useDevice();

    return (
        <>
            {deviceId !== "small" &&
            <Text
                color={colorAbout}
                fontSize={90}
                letterSpacing={-0.1}
                lineHeight={1}
                font={graffiti}
                position={[0,30,300]}
                rotation={[-0.2, -0.07, -0.03]}
            >
                {"ABOUT ME"}
            </Text>
            }
            {deviceId === "small" &&
            <Text
                color={colorAbout}
                fontSize={80}
                lineHeight={1}
                font={graffiti}
                position={[0,50,300]}
                rotation={[-0.3, -0.07, -0.03]}
            >
                About Me
            </Text>
            }
        </>
    );
}