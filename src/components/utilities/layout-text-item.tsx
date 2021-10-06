import styled from "styled-components";
import {breakpointSmall, spacings} from "../../style/constants";

export const LayoutTextItem = styled.div`
    margin-bottom: ${spacings.xSmallSm};

    @media(min-width: ${breakpointSmall}) {
        margin-bottom: ${spacings.xSmallMd}
    }
`