import styled from "styled-components";
import {breakpointSmall} from "../../style/constants";

export const LayoutTextSection = styled.div`
    margin-bottom: 50px;

    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 7vh;
    }
`

export const LayoutTextItem = styled.div`
    margin-bottom: 10px;
    @media (min-width: ${breakpointSmall}) {
        margin-bottom: 1vh;
    }
`