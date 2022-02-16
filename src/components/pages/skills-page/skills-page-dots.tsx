import React from "react";
import DotsGrid from "../../dots-row/dots-grid";
import styled from "styled-components";

const StyledRoot = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
`


export default function SkillsPageDots() {
    return (
        <StyledRoot>
            <DotsGrid numDots={15} numDotsHeight={50}/>
        </StyledRoot>
    );
}
