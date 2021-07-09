import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Billelis from '../../images/Billelis.jpg';


const StyledRoot = styled.div`
    min-height: 100vh;
    background-image: url(${Billelis});
    background-size: cover;
    background-position: center;
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