import React, {useContext, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import styled from "styled-components";
import {EyeGLTFResult} from "../../models/eye-model";
import CursorFollowModelContent from "./cursor-follow-model-content";
import MousePositionContext from "../../../contexts/mouse-position-context";

const StyledRoot = styled.div`
    width: 75px;
    height: 75px;
`

const StyledCanvas = styled(Canvas)`
    canvas:focus {
        outline: none;
    }
`

export interface CursorFollowModelProps {
    gltf: EyeGLTFResult;
    z?: number;
}

export default function CursorFollowModel(props: CursorFollowModelProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [centerCoordinates, setCenterCoordinates] = useState<{x: number, y: number}>();
    const mousePositionRef = useContext(MousePositionContext).mousePositionRef;

    useEffect(() => {
        function updateCenterCoordinates() {
            if (!ref.current) {
                return;
            }

            const rect = ref.current.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const x = rect.left + scrollLeft + rect.height/2;
            const y = rect.top + scrollTop + rect.width/2;

            setCenterCoordinates({ x, y });
        }

        updateCenterCoordinates();
        window.addEventListener("resize", updateCenterCoordinates);
        return () => window.removeEventListener("resize", updateCenterCoordinates);
    }, [])

    return (
        <StyledRoot ref={ref}>
            <StyledCanvas>
                <CursorFollowModelContent
                    z={props.z}
                    gltf={props.gltf}
                    centerCoordinates={centerCoordinates}
                    mousePositionRef={mousePositionRef}
                />
            </StyledCanvas>
        </StyledRoot>
    );
}