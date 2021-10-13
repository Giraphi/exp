import React from "react";
import SmallEye from "./small-eye/small-eye";
import styled from "styled-components";
import { EyeGLTFResult } from "../../models/eye-model";
import useDevice from "../../../hooks/use-device";

const StyledEyeContainer = styled.div<{ top: string; left: string }>`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
`;

export interface SkillsPageEyesProps {
    eyeGltf: EyeGLTFResult;
}

export default function SkillsPageEyes(props: SkillsPageEyesProps) {
    const device = useDevice();
    return (
        <>
            {device !== "small" && (
                <>
                    <StyledEyeContainer top={"20%"} left={"5%"}>
                        <SmallEye z={-300} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"30%"} left={"80%"}>
                        <SmallEye z={-400} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"45%"} left={"29%"}>
                        <SmallEye z={-250} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"60%"} left={"70%"}>
                        <SmallEye z={-500} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"75%"} left={"8%"}>
                        <SmallEye z={-270} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"90%"} left={"75%"}>
                        <SmallEye gltf={props.eyeGltf} z={-300} />
                    </StyledEyeContainer>
                </>
            )}

            {device === "small" && (
                <>
                    <StyledEyeContainer top={"20%"} left={"80%"}>
                        <SmallEye z={-300} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"30%"} left={"70%"}>
                        <SmallEye z={-400} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"45%"} left={"40%"}>
                        <SmallEye z={-250} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"60%"} left={"70%"}>
                        <SmallEye z={-500} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"73%"} left={"45%"}>
                        <SmallEye z={-270} gltf={props.eyeGltf} />
                    </StyledEyeContainer>

                    <StyledEyeContainer top={"92%"} left={"75%"}>
                        <SmallEye gltf={props.eyeGltf} z={-300} />
                    </StyledEyeContainer>
                </>
            )}
        </>
    );
}
