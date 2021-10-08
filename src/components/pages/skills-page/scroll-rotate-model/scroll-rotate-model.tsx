import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { EyeGLTFResult } from "../../../models/eye-model";
import { useViewportScroll } from "framer-motion";
import ScrollRotateModelContent from "./scroll-rotate-model-content";

const StyledRoot = styled.div`
    width: 50px;
    height: 50px;
`;

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`;

export interface ScrollRotateModelProps {
    gltf: EyeGLTFResult;
    z: number;
}

export default function ScrollRotateModel(props: ScrollRotateModelProps) {
    const { scrollYProgress } = useViewportScroll();

    return (
        <StyledRoot>
            <StyledCanvas>
                <ScrollRotateModelContent scrollYProgress={scrollYProgress} gltf={props.gltf} z={props.z} />
            </StyledCanvas>
        </StyledRoot>
    );
}
