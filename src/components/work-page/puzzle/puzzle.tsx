import React from "react";
import styled from "styled-components";
import {PuzzleAnimationProps} from "./puzzle-animation";

const StyledRoot = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56%;
`

export interface PuzzleAnimationContainerProps {
    children: React.ReactElement<PuzzleAnimationProps>[];
}

export default function Puzzle(props: PuzzleAnimationContainerProps) {
    return (
        <StyledRoot>
            {props.children}
        </StyledRoot>
    );
}