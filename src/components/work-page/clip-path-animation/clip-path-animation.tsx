import React from "react";
import styled from "styled-components";
import {ClipPathAnimationItemProps} from "./clip-path-animation-item";


const StyledRoot = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56%;
`

export interface ClipPathAnimationProps {
    children: React.ReactElement<ClipPathAnimationItemProps>[];
}

export default function ClipPathAnimation(props: ClipPathAnimationProps) {
    return (
        <StyledRoot>
            {props.children}
        </StyledRoot>
    );
}