import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledRoot = styled.div`
    min-height: 100vh;
    overflow:auto;
`

export default function SkillsPage() {
    return (
        <StyledRoot>
            <h1>Other Page</h1>
            <Link to="/">Back to home</Link>
        </StyledRoot>
    );
}